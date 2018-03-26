import firebase from 'firebase';

// change your firebase settings here
const firebaseConfig = {
        apiKey: "AIzaSyDifr-7sAXsRzC86KJdZ_vVRvYtxx45REE",
        authDomain: "todotable-cbd0c.firebaseapp.com",
        databaseURL: "https://todotable-cbd0c.firebaseio.com",
        projectId: "todotable-cbd0c",
        storageBucket: "todotable-cbd0c.appspot.com",
        messagingSenderId: "568081951013"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;