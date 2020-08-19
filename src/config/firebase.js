import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCmDAGtap9Sv2GF-7IzCb0Tw3uZwYoYo_M",
    authDomain: "painters-bootcamp.firebaseapp.com",
    databaseURL: "https://painters-bootcamp.firebaseio.com",
    projectId: "painters-bootcamp",
    storageBucket: "painters-bootcamp.appspot.com",
    messagingSenderId: "119215133477",
    appId: "1:119215133477:web:ee717012c322e6715e00cc"
  };

  firebase.initializeApp(firebaseConfig)

  firebase.firestore()

  export default firebase;