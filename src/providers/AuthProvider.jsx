import { createContext, useEffect } from 'react';
import app from "../firebase/firebase.config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut,getAuth } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signInUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoader(true)
        return signOut(auth)
    }

    const signUpWithGoogle = () =>{
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }
    
    const authInfo = { 
        user,
        setUser,
        loader,
        createUser, 
        signInUser, 
        signOutUser ,
        signUpWithGoogle,
        setUser
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Observing the current user inside useEffect', currentUser);
            setUser(currentUser);
            setLoader(false)
        })

        return () => {
            unSubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
