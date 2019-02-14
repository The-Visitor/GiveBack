const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendEmailToNGO = functions.firestore
    .document('furniture/{quantity}')
    .onCreate((snap, context) => {
      const newValue = snap.data();
      console.log(newValue);
    });
    console.log(0);