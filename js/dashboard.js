$(document).ready(function(){
    $('#profileUpdate').modal({
        backdrop: 'static',
        keyboard: false
    })

    firebase.auth().onAuthStateChanged(function(user)
    {
        if(user)
        {
            $("#user-name").text(user.displayName);
            $("#user-email").text(user.email);
            if(user.metadata.creationTime == user.metadata.lastSigninTime || (!user.phoneNumber))
            {
                FirstTimeLogin(user);
            }
        }
        else
        {
            window.location.href = "../403error.html";
        }
    });
    $("#logout").on("click", function(){
        firebase.auth().signOut();
        location.href = "index.html";
    });

    $("#saveUser").on("click", function(){
        let user = firebase.auth().currentUser;
        console.log(user);
        let currentUser = {
            UserID : user.uid,
            Type : 1,
            IsActive : true,
            CreatedOn : user.metadata.creationTime
          };
        currentUser.Username = $("#userName").val();
        currentUser.PhoneNumber = $("#userPhoneNumber").val();
        currentUser.Email =  $("#userEmail").val();
        currentUser.ProfilePicture = user.photoURL;
        currentUser.ModifiedOn = currentUser.CreatedOn;
        saveuser(currentUser);
    });

    function FirstTimeLogin(user){
        $("#userName").val(user.displayName);
        $("#userEmail").val(user.email);
        $("#userPhoneNumber").val(user.phoneNumber);
        $("#profileUpdate").modal("show");
    }

    function saveuser(UserInfo){
        db.collection("Users").doc(UserInfo.UserID).set(UserInfo).then(function(){
            alert("Profile Updated !");
        }).catch(function(error){
            alert("Oops ! There was some error , Please Try again");
        });
    }

});