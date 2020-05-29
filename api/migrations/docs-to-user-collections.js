'use strict';

const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const userId = 'INSERT_USER_ID';
const data = [];

const insertWeight = async (doc) => {
  const weight = doc.weight;
  const dateTime = doc.dateTime;
  try {
    const writeResult = await admin
      .firestore()
      .collection('users')
      .doc(userId)
      .collection('weights')
      .add({ weight, dateTime });

    console.log(writeResult);
  } catch (error) {
    console.log('Error detecting sentiment or saving message', error.message);
  }
};

try {
  admin
    .firestore()
    .collection('data')
    .where('userId', '==', userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        console.log(data);
        return;
      }
      snapshot.forEach((doc) => {
        const parsedDoc = doc.data();
        data.push({
          id: doc.id,
          weight: parsedDoc.weight,
          dateTime: parsedDoc.dateTime,
        });
      });
      console.log(data);
      data.map((doc) => {
        insertWeight(doc);
      });
      return;
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
} catch (error) {
  console.log('Error when retrieving data: ', error.message);
  return;
}
