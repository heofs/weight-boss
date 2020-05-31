'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const limitRequests = require('./utils/limit-requests.js');
const bodyParser = require('body-parser');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();

const authenticate = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    return res.status(403).send('Unauthorized: No auth headers found.');
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        req.user = decodedIdToken;
        console.log(`${new Date().getTime()} - Authenticated ${req.user.uid}`);
        next();
        return;
      });
  } catch (e) {
    console.log('Error: ', e.message);
    return res.status(403).send('Unauthorized: Invalid token.');
  }
};

app.use(cors);

app.get('/status', async (req, res) => {
  res.status(200).json({
    status: 'OK',
  });
});

app.use(authenticate);
app.use(limitRequests);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getData', async (req, res) => {
  const userId = req.user.uid;
  try {
    await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('weights')
      .get()
      .then((snapshot) => {
        const data = [];
        if (snapshot.empty) {
          return res.status(200).json(data);
        }
        snapshot.forEach((doc) => {
          const parsedDoc = doc.data();
          const jsDate = parsedDoc.dateTime.toDate();

          data.push({
            id: doc.id,
            weight: parsedDoc.weight,
            dateTime: jsDate.getTime(),
          });
        });
        return res.status(200).json(data);
      });
  } catch (error) {
    console.error('Unexpected error when retrieving data: ', error.message);
    return res.sendStatus(500).send('Unexpected error');
  }
});

app.post('/addWeight', async (req, res) => {
  const userId = req.user.uid;
  const { weight: rawWeight, dateTime: timestamp } = req.body;

  if (!rawWeight || !timestamp) {
    return res.status(400).send('Missing weight or date');
  }

  const weight = parseFloat(rawWeight);
  const jsTime = new Date(timestamp);
  const firestoreTime = admin.firestore.Timestamp.fromDate(jsTime);

  try {
    const writeResult = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('weights')
      .add({ weight, dateTime: firestoreTime });

    console.log('wrote: ', writeResult.id);
    return res.status(201).json({
      id: writeResult.id,
      weight,
      dateTime: timestamp,
    });
  } catch (error) {
    console.log('Error: ', error.message);
    return res.sendStatus(500).send('Server failed to insert new data.');
  }
});

app.delete('/deleteWeight', async (req, res) => {
  const userId = req.user.uid;
  const targetDocId = req.body.id;

  try {
    const docRef = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('weights')
      .doc(targetDocId)
      .get();

    await docRef.ref.delete();

    return res.status(204).send();
  } catch (error) {
    console.log('Error when deleting: ', error.message);
    return res.sendStatus(500).send('Error when deleting');
  }
});

// Expose the API as a function
exports.api = functions.region('europe-west2').https.onRequest(app);
