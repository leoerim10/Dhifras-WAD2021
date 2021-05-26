
var isLoggedIn = false;
var currentUser = "";

if (isLoggedIn != true){
    showLoginScreen();
}

var loginform = document.getElementById("login-form");
loginform.addEventListener('submit', function(event){
    event.preventDefault();
    var username = document.getElementById("login-username").value;
    var password = document.getElementById("login-password").value;

    if(username == "admina" && password == "admina"){
        isLoggedIn = true;
        currentUser = "admina";
        showMainScreen();
    } else if (username == "normalo" && password == "normalo"){
        isLoggedIn = true;
        currentUser = "normalo";
        showMainScreen();
    } else {
        isLoggedIn = false;
    }
})

function showLoginScreen() {
    document.getElementById("login-wrapper").style.display = "block";
    document.getElementById("main-wrapper").style.display = "none";
    document.getElementById("add-contact-wrapper").style.display = "none";
    document.getElementById("update-delete-wrapper").style.display = "none";
}

function showMainScreen(){
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("main-wrapper").style.display = "block";
    document.getElementById("add-contact-wrapper").style.display = "none";
    document.getElementById("update-delete-wrapper").style.display = "none";

    if(currentUser == "admina") {
        document.getElementById("user-greeting").innerHTML = "Hallo, admina!";
    } else {
        document.getElementById("user-greeting").innerHTML = "Hallo, normalo!";
    }
}

function showAddContactScreen() {
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("main-wrapper").style.display = "none";
    document.getElementById("add-contact-wrapper").style.display = "block";
    document.getElementById("update-delete-wrapper").style.display = "none";
}

function showUpldateDeleteContactScreen() {
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("main-wrapper").style.display = "none";
    document.getElementById("add-contact-wrapper").style.display = "none";
    document.getElementById("update-delete-wrapper").style.display = "block";
}

function logout(){
    isLoggedIn = false;
    showLoginScreen();
}