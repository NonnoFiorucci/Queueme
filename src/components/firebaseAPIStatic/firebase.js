import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const config = {
    apiKey: "AIzaSyCsWvT_c3djTVxNRjJzVSX7yZfwJnB_sLk",
    authDomain: "queueme-ciovincri.firebaseapp.com",
    databaseURL: "https://queueme-ciovincri.firebaseio.com",
    projectId: "queueme-ciovincri",
    storageBucket: "queueme-ciovincri.appspot.com",
    messagingSenderId: "646656687066"
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();

    }

    //crea un account con mail e psw
    createUserEmailPwd = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    //login con email e pwd
    signInEmailPws = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);
    //login with google
    signInGoogle = () =>
        this.auth.signInWithPopup(this.googleProvider);
    //login with facebook
    signInFacebook = () =>
        this.auth.signInWithPopup(this.facebookProvider);
    //logout
    signOut = () =>
        this.auth.signOut();
    //resetta password
    pwdReset = email =>
        this.auth.sendPasswordResetEmail(email);
    //modifica password
    pwdUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    // *** Queues API***
    getQueueFromUid = uid =>
        this.db.ref(`queues/${uid}`);

    listAllQueues = () => 
        this.db.ref('queues');

    enqueueUser = (uid, userid) =>
        this.db.ref(`queues/${uid}/enqueued/${userid}`);

    dequeueUser = (uid, userid) =>
        this.db.ref(`queues/${uid}/enqueued/${userid}`);

    getUsercounter = uid =>
        this.db.ref(`queues/${uid}/usercounter`);

}
export default Firebase;