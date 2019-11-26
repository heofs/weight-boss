import React, { createContext, useState, useEffect } from 'react';
import firebase from './firebase';

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
      return user;
    });
  };

  const persistSignin = async () =>
    await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const signinGoogle = async () => {
    await googleProvider.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        setUser(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const sendPasswordResetEmail = (email) => {
    return auth.sendPasswordResetEmail(email).then(() => {
      return true;
    });
  };

  const confirmPasswordReset = (code, password) => {
    return auth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
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
