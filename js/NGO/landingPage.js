$(document).ready(function(){
    function successMessage(message){
        new PNotify({
            title: 'Hello!',
            text: message,
            type: 'success',
            delay: 2000
          });
    }


    $(".NGOsignUp").submit(function(e){
        let email = $("#NGOEmail").val();
        let password = $("#NGOPassword").val();
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            successMessage("Account Created Successfully");
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    });
});