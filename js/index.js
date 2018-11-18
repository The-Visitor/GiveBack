$(document).ready(function(){

    // connect to Database
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


    $("#siteLogo").on("click", function(){
        $(window).location.reload();
    });

    $("#clothesDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#clothesDonate").show("slow");
    });

    $("#foodDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#foodDonate").show("slow");
    });

    $("#moneyDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#moneyDonate").show("slow");
    });

    $("#furnitureDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#furnitureDonate").show("slow");
    });

    $("#electronicsDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#electronicsDonate").show("slow");
    });

    $("#volunteerButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#volunteer").show("slow");
    });

    $("#bloodDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#bloodDonate").show("slow");
    });

    $("#vehicleDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#vehicleDonate").show("slow");
    });

    $("#booksDonateButton").on("click", function(){
        $(".LandingPage").hide("slow");
        $("#booksDonate").show("slow");
    });

    $(".donateButton").on("click", function(){
        $("#donarDetails").show("show");
    });

    $("#signUpForm").submit(function(e){
        e.preventDefault();
        let userName = $("#userName").val();
        let userEmail = $("#userEmail").val();
        let userPhoneNumber = $("#userPhoneNumber").val();
        let userGender = $("#userGender").val();
        console.log(userName, userEmail, userPhoneNumber, userGender);
        db.collection("usersInformation").add({
            Name: userName,
            Email: userEmail,
            PhoneNumber: userPhoneNumber,
            Gender: userGender
        })
        .then(function(document) {
            alert("Document written with ID: ", document.id);
            $("#myModal").modal("hide");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

});