import * as firebase from 'firebase/app';
import 'firebase/auth';

// Set these to your own variables.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'weight-boss.firebaseapp.com',
  databaseURL: 'https://weight-boss.firebaseio.com',
  projectId: 'weight-boss',
  storageBucket: 'weight-boss.appspot.com',
  messagingSenderId: '156485627213',
  appId: '1:156485627213:web:a8664bba782e8a64285b04',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
