
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAcu3hP4IpOZ19KHbq3kyExQg7Zy7RB0SY",
    authDomain: "doanit-ee94d.firebaseapp.com",
    projectId: "doanit-ee94d",
    storageBucket: "doanit-ee94d.appspot.com",
    messagingSenderId: "299006604518",
    appId: "1:299006604518:web:ded40799f30eddf33a7727"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
