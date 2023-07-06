import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  createUserDocumentFromAuth(userAuth);
};

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore(); //this actually directly points to our database inside the console

//to use the above db we need to create some method 

const createUserDocumentFromAuth = async (userAuth) => {
   
   const userDocRef = doc(db, 'users', userAuth.uid);
   console.log(userDocRef);

   const userSnapshot = await getDoc(userDocRef);
   console.log(userSnapshot);
   console.log(userSnapshot.data);
   console.log(userSnapshot.exists());

   if( !userSnapshot.exists() ) {
    const { name, email } = userAuth;
    const createdAt = new Date();

    try {
      console.log(name + ' ' + email + ' createdAt ' + createdAt);
      await setDoc(userDocRef, {name, email, createdAt});
  
    } catch (error) {
      console.log('!Erorr creating the user: ' + error.message);
    }
  }

  return userDocRef;
}