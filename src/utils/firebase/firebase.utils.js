import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,  //to access the instance of data stored
  getDoc, //this actually gets the data
  setDoc 
} from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCdGDh6MXRjIqere24G2VR7XP7KePdD5zA",
  authDomain: "lotus-clothing-db-32640.firebaseapp.com",
  projectId: "lotus-clothing-db-32640",
  storageBucket: "lotus-clothing-db-32640.appspot.com",
  messagingSenderId: "443428257515",
  appId: "1:443428257515:web:53e9e11a72426f9d7f48ae"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  createUserDocumentFromAuth(userAuth);
};

//What is our Auth?
//the auth is a singleton because it keeps track of the authentication state of the entire application as the user signs in through different 
//means and methods.We need some way to be certain of what it is that the user has done, especially in the framework of 
//this browser, where whenever you navigate away from your website, you are breaking the instance of the website now.
//So this off is the only way we can keep track of whether or not users are properly authenticating or not. And that's what's great about this service of Firebase.

export const auth = getAuth(); 
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore(); //this actually directly points to our database inside the console

//to use the above db we need to create some method 

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};