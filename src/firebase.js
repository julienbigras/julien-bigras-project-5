import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCb5AMHQL2cWq49ehhXF-3pTNlJKTnKVvQ",
    authDomain: "julien-bigras-project-5.firebaseapp.com",
    databaseURL: "https://julien-bigras-project-5.firebaseio.com",
    projectId: "julien-bigras-project-5",
    storageBucket: "julien-bigras-project-5.appspot.com",
    messagingSenderId: "599630672244",
    appId: "1:599630672244:web:0d4939869520c64a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;