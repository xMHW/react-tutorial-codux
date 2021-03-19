import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyChBEl3151iaSQFQpJnQlfMBgYYB0EbWG0",
    authDomain: "test-example-d1575.firebaseapp.com",
    projectId: "test-example-d1575",
    storageBucket: "test-example-d1575.appspot.com",
    messagingSenderId: "221063688520",
    appId: "1:221063688520:web:324da0abd9bb9b7212837d",
    measurementId: "G-6LB8WVB65W"
});

const db = firebaseApp.firestore();

export {db, firebaseApp };