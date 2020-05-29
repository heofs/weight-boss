'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const limitRequests = require('./utils/limit-requests.js');

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
    console.count('NO AUTH HEADERS FOUND');
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
    console.log(e);
    return res.status(403).send('Unauthorized');
  }
};

app.use(cors);

app.get('/status', async (req, res) => {
  res.status(200).json({
    status: 'OK',
  });
});

app.use(authenticate);
if (!process.env.NODE_ENV === 'dev') {
  app.use(limitRequests);
}

app.post('/addWeight', async (req, res) => {
  const userId = req.user.uid;
  const { weight: rawWeight, dateTime } = req.body;

  if (!rawWeight || !dateTime) {
    return res.status(400).send('Missing weight or date');
  }

  const weight = parseFloat(rawWeight);

  const seconds = parseInt(dateTime / 1000);
  const milliSeconds = parseInt(dateTime.toString().slice(-3));
  const firestoreTime = new admin.firestore.Timestamp(seconds, milliSeconds);

  try {
    const writeResult = await admin
      .firestore()
      .collection('data')
      .add({ userId, weight, dateTime: firestoreTime });

    console.log('wrote: ', writeResult.id);
    return res.status(201).json({
      id: writeResult.id,
      weight,
      dateTime,
    });
  } catch (error) {
    console.log('Error detecting sentiment or saving message', error.message);
    return res
      .sendStatus(500)
      .send('Error detecting sentiment or saving message');
  }
});

app.get('/getData', async (req, res) => {
  const userId = req.user.uid;
  try {
    await admin
      .firestore()
      .collection('data')
      .where('userId', '==', userId)
      .get()
      .then((snapshot) => {
        const data = [];
        if (snapshot.empty) {
          return res.status(200).json(data);
        }
        snapshot.forEach((doc) => {
          const parsedDoc = doc.data();
          const timestamp = parseInt(parsedDoc.dateTime._seconds * 1000);
          data.push({
            id: doc.id,
            weight: parsedDoc.weight,
            dateTime: timestamp,
          });
        });
        return res.status(200).json(data);
      })
      .catch((err) => {
        console.log('Error getting documents', err);
      });
  } catch (error) {
    console.log('Error when retrieving data: ', error.message);
    return res.sendStatus(500).send('Error when retrieving data');
  }
});

app.delete('/deleteWeight', async (req, res) => {
  const userId = req.user.uid;
  const targetDocId = req.body.id;

  try {
    const docRef = await admin
      .firestore()
      .collection('data')
      .doc(targetDocId)
      .get();
    const docData = docRef.data();

    const targetDocUid = docData.userId;
    if (userId !== targetDocUid) {
      throw new Error('You dont have permission to delete this.');
    }

    docRef.ref.delete();

    res.status(201).json({
      id: docData.id,
    });
  } catch (error) {
    console.log('Error when deleting: ', error.message);
    return res.sendStatus(500).send('Error when deleting');
  }
});

// Expose the API as a function
exports.api = functions.region('europe-west2').https.onRequest(app);
