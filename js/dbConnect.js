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

  function authUI(redirectPage, renderElement){
    var uiConfig = {
      signInSuccessUrl: redirectPage,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ]};
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(renderElement, uiConfig);
  }

  function successMessage(message){
    new PNotify({
        title: 'Hi!',
        text: message,
        type: 'success',
        delay: 2000
      });
}

$(document).ready(function(){
  if(document.cookie == 'userid=0' )
    {
        $("#helpUs").before(`<a id="NGOLogin" class="navbar-brand" href="./ngo/ngo.html" style="width:130px;" >
        <span>We are an NGO</span>
      </a>
      <a id="signUpButton" class="navbar-brand" href="#" data-toggle="modal" data-target="#myModal">
          <span>Sign Up</span>
      </a>`);
    }
    else
    {
        $("#helpUs").before(`<button class="navbar-brand logoutButton" style="cursor:pointer" id="logout">Logout</button>`);
    }

    $("nav").on("click",".logoutButton", function(){
        firebase.auth().signOut();
        document.cookie = `userid=${0};isLoggedIn=false;path=/`;
        location.href = "./index.html";
    });
});