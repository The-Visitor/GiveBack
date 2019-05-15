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
      e.preventDefault();
      $(".submitNGOData").text("Please wait...");
        let email = $("#NGOEmail").val();
        let password = $("#NGOPassword").val();
        let name = $("#NGOName").val();
        let address = $("#NGOLocation").val();
        let type = $("#NGOType").val();
        let phone = $("#NGOPhone").val();
        let pincode = $("#NGOPincode").val();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            var user = firebase.auth().currentUser;
            var data = {
              OrganizationID : user.uid,
              Name : name,
              Type : type,
              Phonenumber : phone,
              Address : address,
              IsActive : true,
              CreatedOn : user.metadata.creationTime,
              ModifiedOn : user.metadata.creationTime,
              Email : email,
              Pincode: pincode
            };
            user.updateProfile({
                displayName: name,
                phoneNumber : phone
              }).then(function() {
                db.collection("Organization").doc(user.uid).set(data).then(function(res){
                   successMessage("Account Created Successfully. Login Again to see dashboard");
                });
              }).catch(function(error) {
                failureMessage("Your details were not saved. Update it from your dashboard");
              }).finally(function(){
                $(".submitNGOData").text("Submit");
              });
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            failureMessage("There was some error , check you details and try again");
            // ...
          });
    });

    $('.select2').select2({
      placeholder: "Select Type",
      allowClear: true
        }); 

      $(".loginText").on("click", function(){
        $("#loginOrganization").modal("show");
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
          window.location.href = "/NGO/dashboard.html";
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      });
});