$(document).ready(function(){
    function successMessage(message){
        new PNotify({
            title: 'Hello!',
            text: message,
            type: 'success',
            delay: 2000
          });
    }

    function failureMessage(message){
        new PNotify({
            title: 'Sorry!',
            text: message,
            type: 'error',
            delay: 2000
          });
    }


    $(".NGOsignUp").submit(function(e){
        let email = $("#NGOEmail").val();
        let password = $("#NGOPassword").val();
        let name = $("#NGOName").val();
        let address = $("#NGOLocation").val();
        let type = $("#NGOType").val();
        let phone = $("#NGOPhone").val();
        let pincode = $("#NGOPincode").val();
        let typeOfuser = 2;
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            var user = firebase.auth().currentUser;
            var data = {
              UID : user.uid,
              Address : address,
              Type : type,
              Phone : phone,
              Pincode: pincode,
              Active : true,
              typeOfuser : typeOfuser
            };
            user.updateProfile({
                displayName: name
              }).then(function() {
                db.collection("Organization").add(data).then(function(res){
                   successMessage("Account Created Successfully");
                });
                setTimeout(function(){
                    window.location = "../NGO/dashboard.html";
                },3000)
              }).catch(function(error) {
                failureMessage("Your details were not saved. Update it from your dashboard");
              });
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            failureMessage("There was some error , check you details and try again");
            // ...
          });
    });
});