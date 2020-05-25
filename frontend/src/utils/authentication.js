import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import localforage from 'utils/localforage';
import firebase from './firebase';

export const AuthContext = createContext();

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const disablePersistence = () => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION);
  };

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => setUser(response.user));
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => setUser(res.user));
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        localforage.clear();
      });
  };

  const signinGoogle = async () => {
    return firebase
      .auth()
      .signInWithRedirect(googleProvider)
      .then((res) => {
        setUser(res.user);
        setLoading(false);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (code, password) => {
    return firebase.auth().confirmPasswordReset(code, password);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((changedUser) => {
      setLoading(false);
      if (changedUser) {
        setUser(changedUser);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    signin,
    signup,
    signout,
    signinGoogle,
    sendPasswordResetEmail,
    confirmPasswordReset,
    disablePersistence,
  };
}

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
