import firebase from 'firebase';
import '@firebase/messaging';


const config = {
  apiKey: "AIzaSyCsWvT_c3djTVxNRjJzVSX7yZfwJnB_sLk",
  authDomain: "queueme-ciovincri.firebaseapp.com",
  databaseURL: "https://queueme-ciovincri.firebaseio.com",
  projectId: "queueme-ciovincri",
  storageBucket: "queueme-ciovincri.appspot.com",
  messagingSenderId: "646656687066"
};

// let messaging;
// if(firebase.messaging.isSupported()){
//   messaging = firebase.messaging();
// }

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//           updateViaCache: 'none'
//       });
//       messaging.useServiceWorker(registration);
//   });
// }


const fire = firebase.initializeApp(config);
const secondaryApp = firebase.initializeApp(config, "Secondary");

const providerGoogle = new firebase.auth.GoogleAuthProvider();


export { fire,secondaryApp, providerGoogle};