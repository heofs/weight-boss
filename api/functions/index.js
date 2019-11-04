'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Follow instructions to set up admin credentials:
// https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const express = require('express');
const cors = require('cors')({ origin: true });
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  console.log('Authenticating... ');
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer ')
  ) {
    console.count('NO AUTH HEADERS FOUND');
    res.status(403).send('Unauthorized');
    return;
  }
  const idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    await admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        req.user = decodedIdToken;
        next();
        return;
      });
  } catch (e) {
    console.log(e);
    res.status(403).send('Unauthorized');
    return;
  }
};

app.use(cors);

app.get('/status', async (req, res) => {
  res.status(201).json({
    status: 'OK',
  });
});

app.use(authenticate);

app.post('/addWeight', async (req, res) => {
  const userId = req.user.uid;
  console.log('userId: ', userId);
  const { weight: rawWeight, dateTime } = req.body;

  if (!rawWeight || !dateTime) {
    throw new Error('No weight or dateTime found in body!');
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
    res.status(201).json({
      id: writeResult.id,
      weight,
      dateTime,
    });
  } catch (error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
});

app.get('/getData', async (req, res) => {
  const userId = req.user.uid;
  console.log('userId: ', userId);

  try {
    await admin
      .firestore()
      .collection('data')
      .where('userId', '==', userId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          throw new Error('Found no documents.');
        }

        const data = [];
        snapshot.forEach(doc => {
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
      .catch(err => {
        console.log('Error getting documents', err);
      });
  } catch (error) {
    console.log('Error when retrieving data: ', error.message);
    res.sendStatus(500);
  }
});

app.delete('/deleteWeight', async (req, res) => {
  const userId = req.user.uid;
  const targetDocId = req.body.id;
  console.log('userId: ', userId);

  try {
    const writeResult = await admin
      .firestore()
      .collection('data')
      .doc(targetDocId)
      .delete();

    console.log('deleted: ', writeResult.id);
    res.status(201).json({
      id: writeResult.id,
    });
  } catch (error) {
    console.log('Error detecting sentiment or saving message', error.message);
    res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.region('europe-west2').https.onRequest(app);
