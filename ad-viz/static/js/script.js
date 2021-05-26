var isLoggedIn = false;
var currentUser = "";
var admina_contacts = [];
var normalo_contacts = [];

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

var addcontactform = document.getElementById("add-contact-form");
addcontactform.addEventListener('submit', function(event){
    event.preventDefault();
    let firstname = document.getElementById("add-contact-firstname").value;
    let lastname = document.getElementById("add-contact-lastname").value;
    let street = document.getElementById("add-contact-street").value;
    let zip = document.getElementById("add-contact-zip").value;
    let city = document.getElementById("add-contact-city").value;
    let state = document.getElementById("add-contact-state").value;
    let country = document.getElementById("add-contact-country").value;
    let private = document.getElementById("add-contact-private-public-checkbox").value;
    let owner = document.getElementById("add-contact-owner").value;

    let contact = {
        firstname: firstname,
        lastname: lastname,
        street: street,
        zip: zip,
        city: city,
        state: state,
        country: country,
        visibility: private,
        owner: owner
    };

    if(owner == "normalo"){
        normalo_contacts.push(contact);
    } else {
        admina_contacts.push(contact);
        console.log(admina_contacts);
    }
    showMainScreen();
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
    if(currentUser == "normalo"){
        document.getElementById("normaloOption").style.display = "none";
    }
}

function showUpldateDeleteContactScreen() {
    document.getElementById("login-wrapper").style.display = "none";
    document.getElementById("main-wrapper").style.display = "none";
    document.getElementById("add-contact-wrapper").style.display = "none";
    document.getElementById("update-delete-wrapper").style.display = "block";
}

function populateContactList(){
}

function logout(){
    isLoggedIn = false;
    showLoginScreen();
}