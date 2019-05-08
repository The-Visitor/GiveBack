var Clothes = 0;
var Food = 0;
var Money = 0;
var Furniture = 0;
var Electronics = 0;
var Volunteer = 0;
var Blood = 0;
var Vehicle = 0;
var Books = 0;
let collection = ["Clothes","Food","Money","Furniture","Electronics","Volunteer","Blood","Vehicle","Books"];
let data = [];
for(let i = 0;i<collection.length;i++)
{
    db.collection(collection[i]).get().then(function(res){
        data[i] = (res.size);
    });
}