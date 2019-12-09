import * as firebase from 'firebase/app';
import 'firebase/auth';

// Set these to your own variables.
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'api.weight.ofstad.io',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
