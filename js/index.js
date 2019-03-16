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

    $("#clothesImage").on("change", function(e){
        // get file 
        var file  = e.target.files[0];

        //upload file 
       var storageRef =  firebase.storage().ref('clothes' + file.name)
        
       var task = storageRef.put(file);
        //update progress bar 
        task.on('state_changed', 
        function progress(snapshot) {
            var percentage  = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 ;
            $("#clothImageUpload").val(percentage);
        }
        )
    })

    $("#checkStatus").on("click", function(){
        let id = $("#donationId").val().replace(/\s/g,'');// removes white spaces
        if(id)
        {
            let data;
            let collection = ["Blood","Books","Clothes","Electronics","Food","Furniture","Vehicle"];
            for(let i = 0;i<collection.length;i++)
            {
                db.collection(collection[i]).doc(id).get().then(function(res){
                    if(res.data())
                    {
                        data=res.data();
                        let template = `<p class="lead" style="padding:20px;">This is the status of your order: ${res.data().status}</p>`;
                        $(".donationStatus").append(template);
                    }
                });
            }
        }
        else
        {
            failureMessage("Value cannot be empty");
        }
    });

    $("nav").on("click",".logoutButton", function(){
        firebase.auth().signOut();
        document.cookie = `userid=${0};isLoggedIn=false;path=/`;
        location.reload();
    });

});