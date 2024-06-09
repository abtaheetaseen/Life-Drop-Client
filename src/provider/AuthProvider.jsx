import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import auth from '../firebase/firebase.config';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const axiosPublic = useAxiosPublic();

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
        const unSubscribe = onAuthStateChanged(auth, currentUser => {

            console.log("observer current user", currentUser);
            setUser(currentUser);

            if(currentUser) {
                // get token and store client
                const userInfo = {email: currentUser?.email}
                axiosPublic.post("/jwt", userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem("access-token", res.data.token);
                    }
                })
            } else {
                localStorage.removeItem("access-token");
            }

            setLoading(false)

        })

        return () => {
            unSubscribe();
        }
    }, [axiosPublic])

    const authInfo = {createUser, logOut, signInUser, user, name, setName, setPhotoURL, photoURL, updateUserProfile, loading, setLoading}

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider