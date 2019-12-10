import * as firebase from 'firebase/app';
import 'firebase/auth';

const API_KEY = process.env.REACT_APP_API_KEY;
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: `${PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
  projectId: PROJECT_ID,
  storageBucket: `${PROJECT_ID}.appspot.com`,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
