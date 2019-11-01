"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Follow instructions to set up admin credentials:
// https://firebase.google.com/docs/functions/local-emulator#set_up_admin_credentials_optional
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
  console.log("Authenticating... ");

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    console.count("NO AUTH HEADERS FOUND");
    res.status(403).send("Unauthorized");
    return;
  }
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedIdToken;
    next();
    return;
  } catch (e) {
    console.log(e);
    res.status(403).send("Unauthorized");
    return;
  }
};

app.use(cors);
app.use(authenticate);

app.post("/api/addWeight", async (req, res) => {
  const userId = req.user.uid;
  console.log("userId: ", userId);
  const { weight: rawWeight, dateTime } = req.body;

  if (!rawWeight || !dateTime) {
    console.log("No weight or dateTime found in body!");
    return;
  }

  const weight = parseFloat(rawWeight);
  const jsDate = new Date(dateTime);
  const jsTimestamp = jsDate.getTime();
  const timestamp = jsTimestamp / 1000;
  const nanoSeconds = parseInt(jsTimestamp.toString().slice(-3));
  const firestoreTime = new admin.firestore.Timestamp(timestamp, nanoSeconds);

  try {
    const writeResult = await admin
      .firestore()
      .collection("data")
      .add({ userId, weight, dateTime: firestoreTime });

    console.log("wrote: ", writeResult.id);
    res.status(201).json({
      id: writeResult.id,
      weight,
      dateTime: jsDate
    });
  } catch (error) {
    console.log("Error detecting sentiment or saving message", error.message);
    res.sendStatus(500);
  }
});

app.get("/api/getData", async (req, res) => {
  const userId = req.user.uid;
  console.log("userId: ", userId);

  try {
    const data = [];

    await admin
      .firestore()
      .collection("data")
      .where("userId", "==", userId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        snapshot.forEach(doc => {
          const parsedDoc = doc.data();
          const dateTime = new Date(parsedDoc.dateTime._seconds * 1000);

          data.push({ id: doc.id, weight: parsedDoc.weight, dateTime });
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    res.status(201).json(data);
  } catch (error) {
    console.log("Error detecting sentiment or saving message", error.message);
    res.sendStatus(500);
  }
});

app.delete("/api/deleteWeight", async (req, res) => {
  const userId = req.user.uid;
  const targetDocId = req.body.id;
  console.log("userId: ", userId);

  try {
    const writeResult = await admin
      .firestore()
      .collection("data")
      .doc(targetDocId)
      .delete();

    console.log("deleted: ", writeResult.id);
    res.status(201).json({
      id: writeResult.id
    });
  } catch (error) {
    console.log("Error detecting sentiment or saving message", error.message);
    res.sendStatus(500);
  }
});

// Expose the API as a function
exports.api = functions.https.onRequest(app);
