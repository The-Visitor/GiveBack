if(localStorage.getItem("Userid"))
{
    $("#loginButton").text(`Hello ${localStorage.getItem("Username")}`);
    $("#signUpButton").text("Logout");
    
    $("#donarAddressDetails").find("#donarName").val(localStorage.getItem('Username'));
    $("#donarAddressDetails").find("#donarEmail").val(localStorage.getItem('Useremail'));
    $("#donarAddressDetails").find("#donarPhoneNumber").val(localStorage.getItem('Userphone'));
    $("#donarAddressDetails").find("#donarType").val(localStorage.getItem('Usergender'));
}

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

$("#signUpButton").on("click", function(e){
    if(localStorage.getItem("Userid"))
    {
        localStorage.clear();
        location.reload();
        e.preventDefault();
        let form = document.getElementById("donarAddressDetails");
        form.reset();
        return;
    }
})

$("#signUpForm").submit(function(e){
    e.preventDefault();
    let userName = $("#userName").val();
    let userEmail = $("#userEmail").val().toLowerCase();
    let userPassword = $("#userPassword").val();
    let userPhoneNumber = $("#userPhoneNumber").val();
    let userGender = $("#userGender").val();

    db.collection("usersInformation").where("Email","==",userEmail).get().then(function(snapshot){
        if(snapshot.size === 0)
        {
            let id;
            db.collection("usersInformation").get().then(function(allDocument){
                id = allDocument.size +1 ;
            }).then(function(allDocument){
                db.collection("usersInformation").add({
                    UserID: id,
                    Name: userName,
                    Email: userEmail,
                    Password: userPassword,
                    PhoneNumber: userPhoneNumber,
                    Gender: userGender
                })
                .then(function(document) {
                    successMessage("Congratulations, Your account is created. Login to verify it.");
                    $("#myModal").modal("hide");
                    $("#signUpForm input").val("");
                    $("#loginModal").modal("show");
                })
                .catch(function(error) {
                    failureMessage("Sorry, There was some error. Please try again in a bit.")
                    alert("Error adding document: ", error);
                });
            })
        }
        else
        {
            failureMessage("This email is already registered. Try with different Email ID or Login.")
        }
    });
});

$("#loginForm").submit(function(e){
    e.preventDefault();
    let userEmail = $("#userEmailValidate").val().toLowerCase();
    let userPassword = $("#userPasswordValidate").val();
    db.collection("usersInformation").where("Email","==",userEmail).get().then(function(snapshot){
        if(snapshot.size > 0)
        {
            snapshot.forEach(function(doc){
                if(doc.data().Password == userPassword)
                {
                    $("#loginModal").modal("hide");
                    $("#loginButton span").text(`Hello ${doc.data().Name}`);
                    $("#signUpButton").text("Logout");
                    successMessage("You are Logged In");
                    localStorage.setItem('Username',doc.data().Name);
                    localStorage.setItem('Useremail',doc.data().Email);
                    localStorage.setItem('Userid',doc.data().UserID);
                    localStorage.setItem('Userphone',doc.data().PhoneNumber);
                    localStorage.setItem('Usergender', doc.data().Gender);
                }
                else{
                    failureMessage("Check Your credentials and try again.");
                }
            })
        }
        else
        {
            failureMessage("Check Your credentials and try again.");
        }
    })
});


$("#clothesDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 1;
    window.scrollTo(0, 570);
    e.preventDefault();

    //
});

$("#foodDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
        data["UserID"] = 0;
    }
    data["DonationType"] = 2;
    window.scrollTo(0, 570);
    console.log(data);
    e.preventDefault();
});

$("#furnitureDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 4;
    window.scrollTo(0, 570);
    e.preventDefault();
});

$("#electronicsDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 5;
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#bloodDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 7;
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#vehicleDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 8;
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#bookDonateForm").submit(function(e){
    data = objectifyForm($(this).serializeArray());
    if(localStorage.getItem("Userid"))
    {
        data["UserID"] = localStorage.getItem("Userid");
    }
    else{
    data["UserID"] = 0;
    }
    data["DonationType"] = 9;
    window.scrollTo(0, 570);
    e.preventDefault();

});

$("#donarAddressDetails").submit(function(e){
    var address = objectifyForm($(this).serializeArray());
    data.User = address;
    switch (data.DonationType) {
        case 1:
            db.collection("Clothes").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 2:
            db.collection("Food").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 3:
            db.collection("Money").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 4:
            db.collection("Furniture").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 5:
            db.collection("Electronics").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 6:
            db.collection("Volunteer").add(data).then(function(res){
                successMessage("Details Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 7:
            db.collection("Blood").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 8:
            db.collection("Vehicle").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 9:
            db.collection("Books").add(data).then(function(res){
                successMessage("Donation Submitted, We will get back to you shortly");
                $("#donationSummary").show();
            });
            break;
        case 10:
            db.collection("Other").add(data);
            break;
    }
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

    // bloodDonation : function(){
    //     db.collection("Blood").get().then(function(snapshot){
    //         snapshot.forEach(function(doc){
    //             let card = `<div class='card allDonationCard' style='background:#dc3545;'><div class='card-body'>${doc.data().Type} <br> ${doc.data().Description} ${doc.data().Quantity} by ${doc.data().User.Name} </div></div>`;
    //             $("#allDonationsCard").append(card);
    //         })
    //     })
    // },

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

$("#testButton").on("click", function(){
    console.log(data);
});

$(".totalDonation").on("click", function(){
    $("section").hide();
    $("#allDonations").show();
    renderAllCards();
});
