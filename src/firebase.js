import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC8H0JBGLlKfcG0Vfi_tgyIgVfhUESruRM",
    authDomain: "where-s-waldo-5836f.firebaseapp.com",
    projectId: "where-s-waldo-5836f",
    storageBucket: "where-s-waldo-5836f.appspot.com",
    messagingSenderId: "377717133385",
    appId: "1:377717133385:web:59dd54cfc62d9f41c6af98",
    measurementId: "G-QVCM58BQWC"
  };
  firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;