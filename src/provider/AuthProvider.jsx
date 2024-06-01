import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.config';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    // create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // update user
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo,
        })
      }

    // logout user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // observe user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, createUser => {

            console.log("observer", createUser);
            setUser(createUser);
            setLoading(false)

        })

        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {createUser, logOut, signInUser, loading, user, name, setName, setPhotoURL, photoURL, updateUserProfile}

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider