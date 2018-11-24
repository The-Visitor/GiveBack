if(localStorage.getItem("Userid"))
{
    $("#loginButton").text(`Hello ${localStorage.getItem("Username")}`);
    $("#signUpButton").text("Logout");
    
    $("#donarAddressDetails").find("#donarName").val(localStorage.getItem('Username'));
    $("#donarAddressDetails").find("#donarEmail").val(localStorage.getItem('Useremail'));
    $("#donarAddressDetails").find("#donarPhoneNumber").val(localStorage.getItem('Userphone'));
    $("#donarAddressDetails").find("#donarType").val(localStorage.getItem('Usergender'));
}

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
    data["UserID"] = localStorage.getItem("Userid");
    console.log(data);
    e.preventDefault();

    db.collection("clothesDonate").add(data);
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
    });
});

$("#electronicsDonateForm").submit(function(e){
    let electronicsType = $("#electronicsType").val();
    let quantity = $("#electronicsQuantity").val();
    let description = $("#electronicsDescription").val();
    e.preventDefault();
    db.collection("electronicsDonate").add({
        ElectronicsType: electronicsType,
        Quantity: quantity,
        Description: description,
        IsActive: true
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
    });
});

$("#vehicleDonateForm").submit(function(e){
    let vehicleType = $("#vehicleType").val();
    let quantity = $("#vehicleQuantity").val();
    let description = $("#vehicleDescription").val();
    e.preventDefault();
    db.collection("vehicleDonate").add({
        vehicleType: vehicleType,
        Quantity: quantity,
        Description: description,
        IsActive: true
    });
});

$("#bookDonateForm").submit(function(e){
    let bookType = $("#bookType").val();
    let quantity = $("#bookQuantity").val();
    let description = $("#bookDescription").val();
    e.preventDefault();
    db.collection("bookDonate").add({
        bookType: bookType,
        Quantity: quantity,
        Description: description,
        IsActive: true
    });
});

$("#donarAddressDetails").submit(function(e){
    let name = $("#donarName").val();
    let email = $("#donarEmail").val();
    let phone = $("#donarPhoneNumber").val();
    let gender = $("#donarType").val();
    let pincode = $("#donarPincode").val();
    let city = $("#donarCity").val();
    let address = $("#donarAddress").val();

    e.preventDefault();
    db.collection("donarAddress").add({
        Name: name,
        Email: email,
        PhoneNumber: phone,
        Gender: gender,
        address: {
            PinCode: pincode,
            City: city,
            Address: address
        },
        IsActive: true
    });
})

var renderDonate = {

    clothesDonate : function(){
        db.collection("clothesDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#007bff;'><div class='card-body'>${doc.data().Material} <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    foodDonate : function(){
        db.collection("foodDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#6c757d;'><div class='card-body'> ${doc.data().FoodType} <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    moneyDonate : function(){
        db.collection("clothesDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#007bff;'><div class='card-body'>Clothes <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    furnitureDonate : function(){
        db.collection("furnitureDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#f8f9fa;color:black'><div class='card-body'>Furniture <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    
    },

    electronicsDonate : function(){
        db.collection("electronicsDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#ffc107;color:black'><div class='card-body'>${doc.data().ElectronicsType} <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    bloodDonation : function(){
        db.collection("bloodDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#dc3545;'><div class='card-body'>${doc.data().DonarName}  <br> ${doc.data().BloodGroup} ${doc.data().DonarGender} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    vehicleDonate : function(){
        db.collection("vehicleDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#343a40;'><div class='card-body'>${doc.data().vehicleType} <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    },

    booksDonate : function(){
        db.collection("bookDonate").get().then(function(snapshot){
            snapshot.forEach(function(doc){
                let card = `<div class='card allDonationCard' style='background:#17a2b8;'><div class='card-body'>${doc.data().bookType}  <br> ${doc.data().Description} ${doc.data().Quantity} </div></div>`;
                $("#allDonationsCard").append(card);
            })
        })
    }
}
function renderAllCards(){
    renderDonate.bloodDonation();
    renderDonate.clothesDonate();
    renderDonate.booksDonate();
    renderDonate.electronicsDonate();
    renderDonate.foodDonate();
    renderAllCards.vehicleDonate();
    renderDonate.moneyDonate();
    renderDonate.furnitureDonate();

}
$(".totalDonation").on("click", function(){
    $("section").hide();
    $("#allDonations").show();
    renderAllCards();
});
