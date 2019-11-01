import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmsO1LBIPfoXr53zV2SB2FhEnYE0lOX7s",
  authDomain: "weight-boss.firebaseapp.com",
  databaseURL: "https://weight-boss.firebaseio.com",
  projectId: "weight-boss",
  storageBucket: "weight-boss.appspot.com",
  messagingSenderId: "156485627213",
  appId: "1:156485627213:web:69d62ec011338004285b04"
};

firebase.initializeApp(firebaseConfig);

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
