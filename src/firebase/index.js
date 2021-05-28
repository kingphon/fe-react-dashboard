import firebase from 'firebase';
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD6a9MKLt_xdPDBQzmS0jRhTXdaTk0AElY",
  authDomain: "secondhandmarkettest-103d4.firebaseapp.com",
  projectId: "secondhandmarkettest-103d4",
  storageBucket: "secondhandmarkettest-103d4.appspot.com",
  messagingSenderId: "1051856689289",
  appId: "1:1051856689289:web:c9ca5dbc59a7c8f5d30e58",
  measurementId: "G-N9XCSSS590"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage()

export { storage, firebase as default }