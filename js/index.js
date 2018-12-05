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

});