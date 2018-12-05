var config = {
    apiKey: "AIzaSyBP3QkSq5NfwI7rLOCmwKwyb-vtpgkt8nY",
    authDomain: "give-back-77eae.firebaseapp.com",
    databaseURL: "https://give-back-77eae.firebaseio.com",
    projectId: "give-back-77eae",
    storageBucket: "give-back-77eae.appspot.com",
    messagingSenderId: "429327911261"
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();
  db.settings({
    timestampsInSnapshots: true
    });