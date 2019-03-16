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

function objectifyForm(formArray) {
    
    var returnArray = {};
    for (var i = 0; i < formArray.length; i++){
      returnArray[formArray[i]['name']] = formArray[i]['value'];
    }
    return returnArray;
}

var data = {}; 

$("#clothesDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 1;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();
});

$("#foodDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 2;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();
});

$("#furnitureDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 4;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();
});

$("#electronicsDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 5;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#bloodDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 7;
    db.collection("Blood").add(data).then(function(res){
        successMessage("Donation Submitted, We will get back to you shortly");
        document.location.href=`/summary.html?id=${res.id}&type=Blood`; 
    });
    e.preventDefault();

});

$("#vehicleDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 8;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#bookDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 9;
    $("#donarDetails").show("show");
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#volunteerData").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    data["UserID"] = 0;
    data["DonationType"] = 6;
    submitDonation(data);
    this.reset();
    e.preventDefault();
});

function submitDonation(data){

    switch (data.DonationType) {
        case 1:
            db.collection("Clothes").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Clothes`; 
            });
            break;
        case 2:
            db.collection("Food").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Food`; 
            });
            break;
        case 3:
            db.collection("Money").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Money`; 
            });
            break;
        case 4:
            db.collection("Furniture").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Furniture`; 
            });
            break;
        case 5:
            db.collection("Electronics").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Electronics`; 
            });
            break;
        case 6:
            db.collection("Volunteer").add(data).then(function(res){
                successMessage("Thank you for your interest.We will get back to you shortly !");
            });
            break;
        // case 7:
        //     db.collection("Blood").add(data).then(function(res){
        //         successMessage("Donation Submitted, We will get back to you shortly");
        //         document.location.href=`/summary.html?id=${res.id}&type=Blood`; 
        //     });
        //     break;
        case 8:
            db.collection("Vehicle").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Vehicle`; 
            });
            break;
        case 9:
            db.collection("Books").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                document.location.href=`/summary.html?id=${res.id}&type=Books`; 
            });
            break;
        case 10:
            db.collection("Other").add(data);
            break;
    }
}

$("#donarAddressDetails").submit(function(e){
    var address = objectifyForm($(this).serializeArray());
    data.User = address;
    submitDonation(data);
    e.preventDefault();
})

var renderDonate = {

    clothesDonate : function(){
        db.collection("Clothes").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#007bff;'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    foodDonate : function(){
        db.collection("Food").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#6c757d;'><div class='card-body'> ${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    moneyDonate : function(){
        db.collection("Money").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#007bff;'><div class='card-body'>Clothes <br> ${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    furnitureDonate : function(){
        db.collection("Furniture").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#f8f9fa;color:black'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    
    },

    electronicsDonate : function(){
        db.collection("Electronics").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#ffc107;color:black'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    // electronicsDonate : function(){
    //     db.collection("Volunteer").get().then(function(snapshot){
    //         snapshot.forEach(function(doc){
    //             let card = `<div class='card allDonationCard' style='background:#ffc107;color:black'><div class='card-body'>${doc.data().ElectronicsType} <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
    //             $("#allDonationsCard").append(card);
    //         })
    //     })
    // },

    bloodDonation : function(){
        db.collection("Blood").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#dc3545;'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    vehicleDonate : function(){
        db.collection("Vehicle").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#343a40;'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    booksDonate : function(){
        db.collection("Book").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#17a2b8;'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    }
}
function renderAllCards(){
    //renderDonate.bloodDonation();
    renderDonate.clothesDonate();
    renderDonate.booksDonate();
    renderDonate.electronicsDonate();
    renderDonate.foodDonate();
    renderDonate.vehicleDonate();
    renderDonate.moneyDonate();
    renderDonate.furnitureDonate();

}

$(".totalDonation").on("click", function(){
    $("section").hide();
    $("#allDonations").show();
    renderAllCards();
});
