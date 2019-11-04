import React, { createContext, useState, useEffect } from 'react';
import firebase, { googleProvider } from './firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const auth = firebase.auth();

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signup = (email, password, displayName) => {
    return auth.createUserWithEmailAndPassword(email, password).then((res) => {
      const user = res.user;
      setUser(user);
      user
        .updateProfile({
          displayName: displayName,
        })
        .then((e) => {
          setUser({ ...user, displayName: displayName });
        });
      return user;
    });
  };

  const signinPersist = async (email, password) => {
    const newSignin = await auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return signin(email, password);
      })
      .catch((error) => {
        console.log(error.message);
      });
    return newSignin;
  };

  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };

  const signinGoogle = () => {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        // console.log(result.credential.accessToken);
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
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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
    signin,
    signup,
    signinPersist,
    signout,
    signinGoogle,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
