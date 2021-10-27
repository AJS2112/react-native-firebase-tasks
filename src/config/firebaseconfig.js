import firebase from 'firebase';
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4R2ZTUHQ0m4CSJtwRufDUWOa-nUgYQa8",
    authDomain: "one-bit-code-tasks-app.firebaseapp.com",
    projectId: "one-bit-code-tasks-app",
    storageBucket: "one-bit-code-tasks-app.appspot.com",
    messagingSenderId: "208195983807",
    appId: "1:208195983807:web:7de9fa0d031d3e51a9290a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = app.firestore();
export default database;