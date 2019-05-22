const functions = require('firebase-functions');


// const config = {
//     apiKey: "AIzaSyCsWvT_c3djTVxNRjJzVSX7yZfwJnB_sLk",
//     authDomain: "queueme-ciovincri.firebaseapp.com",
//     databaseURL: "https://queueme-ciovincri.firebaseio.com",
//     projectId: "queueme-ciovincri",
//     storageBucket: "queueme-ciovincri.appspot.com",
//     messagingSenderId: "646656687066"
//   };
  
// const fire = firebase.initializeApp(config);

const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


//Cloud function per contare il numero di persone in coda 
exports.userEnqueued = functions.database.ref("queues/{queueId}/userList/{userId}").onWrite(
    async (change) => {
        const collectionRef = change.after.ref.parent;
        const countRef = collectionRef.parent.child('numWait');
  
        let increment;
        if (change.after.exists() && !change.before.exists()) {
          increment = 1;
        } else if (!change.after.exists() && change.before.exists()) {
          increment = -1;
        } else {
          return null;
        }
  
        // Return the promise from countRef.transaction() so our function
        // waits for this async event to complete before it exits.
        await countRef.transaction((current) => {
          return (current || 0) + increment;
        });
        console.log('Counter updated.');
        return null;
      })





