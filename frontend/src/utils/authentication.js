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
  const [loading, setLoading] = useState(true);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signin = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
      });
  };

  const persistSignin = () => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
        localforage.setItem('weightData', []);
      });
  };

  const signinGoogle = async () => {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase
          .auth()
          .signInWithRedirect(googleProvider)
          .then((res) => {
            setUser(res.user);
            setLoading(false);
          });
      });
    // try {
    //   await firebase
    //     .auth()
    //     .setPersistence(firebase.auth.Auth.Persistence.LOCAL);

    //   const res = await firebase.auth().signInWithPopup(googleProvider);
    //   setUser(res.user);
    // } catch (error) {
    //   console.log(error.message);
    // }
  };

  const sendPasswordResetEmail = (email) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  const confirmPasswordReset = (code, password) => {
    return firebase.auth().confirmPasswordReset(code, password);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setUser(user);
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
    persistSignin,
    signout,
    signinGoogle,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
