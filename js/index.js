$(document).ready(function(){

    $("#siteLogo").on("click", function(){
        location.reload();
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

    $("#clothesImage").on("change", function(e){
        // get file 
        var file  = e.target.files[0];

        //upload file 
       var storageRef =  firebase.storage().ref('clothes' + file.name)
        
       var task = storageRef.put(file);
        //update progress bar 
        task.on('state_changed', 
        function progress(snapshot) {
            console.log(snapshot);
            var percentage  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
            $("#clothImageUpload").val(percentage);
        }
        )
    })

});