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
        let userEmail = $("#userEmail").val().toLowerCase();
        let userPassword = $("#userPassword").val();
        let userPhoneNumber = $("#userPhoneNumber").val();
        let userGender = $("#userGender").val();

        db.collection("usersInformation").add({
            Name: userName,
            Email: userEmail,
            Password: userPassword,
            PhoneNumber: userPhoneNumber,
            Gender: userGender
        })
        .then(function(document) {
            alert("Document written with ID: ", document.id);
            $("#myModal").modal("hide");
            $("#signUpForm input").val("");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

    $("#loginForm").submit(function(e){
        e.preventDefault();
        let userEmail = $("#userEmailValidate").val().toLowerCase();
        let userPassword = $("#userPasswordValidate").val();
        db.collection("usersInformation").where("Email","==",userEmail).get().then(function(snapshot){
            snapshot.forEach(function(doc){
                if(doc.data().Password == userPassword)
                {
                    $("#loginModal").modal("hide");
                    return;
                }
            })
        })

    });

    $("#clothesDonateForm").submit(function(e){
        let materialType = $("#materialType").val();
        let quantity = $("#clothesQuantity").val();
        let description = $("#clothesDescription").val();
        e.preventDefault();
        db.collection("clothesDonate").add({
            Material: materialType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written with ID: ", document.id);
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

    $("#foodDonateForm").submit(function(e){
        let foodType = $("#foodType").val();
        let foodSubType = $("#foodSubType").val();
        let quantity = $("#foodQuantity").val();
        let description = $("#foodDescription").val();
        e.preventDefault();
        db.collection("foodDonate").add({
            FoodType: foodType,
            FoodSubType: foodSubType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

    $("#furnitureDonateForm").submit(function(e){
        let furnitureType = $("#furnitureType").val();
        let quantity = $("#furnitureQuantity").val();
        let description = $("#furnitureDescription").val();
        e.preventDefault();
        db.collection("furnitureDonate").add({
            furnitureType: foodType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

    $("#electronicsDonateForm").submit(function(e){
        let electronicsType = $("#electronicsType").val();
        let quantity = $("#electronicsQuantity").val();
        let description = $("#electronicsDescription").val();
        e.preventDefault();
        db.collection("furnitureDonate").add({
            ElectronicsType: electronicsType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });
    
    $("#bloodDonateForm").submit(function(e){
        let donarName = $("#bloodDonarName").val();
        let donarEmail = $("#bloodDonarEmail").val();
        let donarPhone = $("#bloodDonarPhoneNumber").val();
        let donarGender = $("#bloodDonarGender").val();
        let bloodGroupType = $("#bloodGroupType").val();
        e.preventDefault();
        db.collection("bloodDonate").add({
            DonarName: donarName,
            DonarEmail: donarEmail,
            DonarPhone: donarPhone,
            DonarGender: donarGender,
            BloodGroup: bloodGroupType,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });
    
    $("#vehicleDonateForm").submit(function(e){
        let vehicleType = $("#vehicleType").val();
        let quantity = $("#vehicleQuantity").val();
        let description = $("#vehicleDescription").val();
        e.preventDefault();
        db.collection("furnitureDonate").add({
            ElectronicsType: vehicleType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });

    $("#bookDonateForm").submit(function(e){
        let bookType = $("#bookType").val();
        let quantity = $("#bookQuantity").val();
        let description = $("#bookDescription").val();
        e.preventDefault();
        db.collection("furnitureDonate").add({
            bookType: bookType,
            Quantity: quantity,
            Description: description,
            IsActive: true
        })
        .then(function(document) {
            alert("Document written");
        })
        .catch(function(error) {
            alert("Error adding document: ", error);
        });
    });
    
    

});