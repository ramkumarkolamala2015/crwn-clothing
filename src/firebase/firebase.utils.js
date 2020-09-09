import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDjl36aw-97s1k3Fcby1FOh0mklXXKGcfA",
    authDomain: "crwn-db-959bc.firebaseapp.com",
    databaseURL: "https://crwn-db-959bc.firebaseio.com",
    projectId: "crwn-db-959bc",
    storageBucket: "crwn-db-959bc.appspot.com",
    messagingSenderId: "141376726842",
    appId: "1:141376726842:web:adc43253aa8832863ad203"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData 
      })
    }catch(error){
      console.log('error creating user',error.message)
    }
  }
  return userRef;
};

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider =  new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;