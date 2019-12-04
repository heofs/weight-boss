import React, { createContext, useState, useEffect } from 'react';
import firebase from './firebase';
import localforage from 'utils/localforage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = res.user;
      setUser(user);
    });
  };

  const persistSignin = () => {
    return auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
      localforage.setItem('weightData', []);
    });
  };

  const signinGoogle = async () => {
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

      const res = await firebase.auth().signInWithPopup(googleProvider);
      setUser(res.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  return {
    user,
    signin,
    signup,
    persistSignin,
    signout,
    signinGoogle,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
