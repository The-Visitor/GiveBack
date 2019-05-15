firebase.auth().onAuthStateChanged(function(user)
{
    if (user) {
        console.log(user);
        document.cookie = `userid=${user.uid};isLoggedIn=true;path=/`;
        
    } else {
        document.cookie = `userid=${0};isLoggedIn=false;path=/`;
    }
});