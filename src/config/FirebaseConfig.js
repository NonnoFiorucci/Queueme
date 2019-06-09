import firebase from 'firebase';


const config = {
  apiKey: "AIzaSyCsWvT_c3djTVxNRjJzVSX7yZfwJnB_sLk",
  authDomain: "queueme-ciovincri.firebaseapp.com",
  databaseURL: "https://queueme-ciovincri.firebaseio.com",
  projectId: "queueme-ciovincri",
  storageBucket: "queueme-ciovincri.appspot.com",
  messagingSenderId: "646656687066"
};

const askForPermissionNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    // console.log("token: ", token);
    localStorage.setItem("notToken",token)
    return token;
  } catch (error) {
    console.error(error)
  }
}
const fire = firebase.initializeApp(config);
const secondaryApp = firebase.initializeApp(config, "Secondary");

const providerGoogle = new firebase.auth.GoogleAuthProvider();


export { fire,secondaryApp, askForPermissionNotifications, providerGoogle};