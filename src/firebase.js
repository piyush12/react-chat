import firebase from 'firebase';
import 'firebase/firestore';

const config = {
 apiKey: "AIzaSyCSBsMzfOqHc--o3M9eSj7Jx_I9qa9WihQ",
    authDomain: "react-chat-8390c.firebaseapp.com",
    databaseURL: "https://react-chat-8390c.firebaseio.com",
    projectId: "react-chat-8390c",
    storageBucket: "react-chat-8390c.appspot.com",
    messagingSenderId: "92602806477",
    appId: "1:92602806477:web:c897999d44c504df"
};

firebase.initializeApp(config);

const db = firebase.firestore();

export { db };
