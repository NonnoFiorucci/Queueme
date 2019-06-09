const functions = require('firebase-functions');


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


exports.pushNotification = functions.database.ref("queues/{:queueId}/userList/{userId}").limitToFirst(3).onWrite(
  async (change) => {
    const queue = change.after.ref.parent;
    const title = queue.parent.child('title');
    const desc = queue.parent.child('description');
    const payload = {
      notification: {
        title: "QueueMe: Tocca quasi a te!",
        body: title + " "+ desc +" ",
        badge: '1',
        sound: 'default'
      }
    }
    const userToken = change.child("tokeNotifyId").val()
    if(userToken)
      admin.messaging().sendToDevice(userToken,payload)    
  }

)




