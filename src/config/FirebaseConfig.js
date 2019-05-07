import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyCsWvT_c3djTVxNRjJzVSX7yZfwJnB_sLk",
  authDomain: "queueme-ciovincri.firebaseapp.com",
  databaseURL: "https://queueme-ciovincri.firebaseio.com",
  projectId: "queueme-ciovincri",
  storageBucket: "queueme-ciovincri.appspot.com",
  messagingSenderId: "646656687066"
};

const fire = firebase.initializeApp(config);

const providerGoogle = new firebase.auth.GoogleAuthProvider();


export { fire, providerGoogle}