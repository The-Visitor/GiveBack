db.collection("DonateClothes").get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    });
})