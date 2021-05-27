// map
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=AppM75r8Qr01WTE3yKsT',{
                            tileSize: 512,
                            zoomOffset: -1,
                            minZoom: 1,
                            attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                            crossOrigin: true
                        }).addTo(map);
                        /*
var marker = L.marker([52.5079, 13.3378]).addTo(map);
var marker = L.marker([52.5945, 13.3501]).addTo(map);
var marker = L.marker([52.613, 13.145]).addTo(map);
*/
/* end map */


/* contacts */
var admina_contacts = [];
var normalo_contacts = [];
populateContacts();
/* end contacts */


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
        //return error - failed login
        isLoggedIn = false;
        showLoginScreen();
    }
});

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
        private: private,
        owner: owner
    };

    if(owner == "normalo"){
        normalo_contacts.push(contact);
    } else {
        admina_contacts.push(contact);
        console.log(admina_contacts);
    }
    showMainScreen();
});

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

function populateContacts() {
    let contact1 = {
        firstname: "admina1",
        lastname: "admina1",
        street: "street",
        zip: "12450",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: true,
        owner: "admina"
    };

    let contact2 = {
        firstname: "admina2",
        lastname: "admina2",
        street: "street",
        zip: "12451",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: false,
        owner: "admina"
    };

    let contact3 = {
        firstname: "normalo1",
        lastname: "normalo1",
        street: "street",
        zip: "12450",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: true,
        owner: "normalo"
    };

    let contact4 = {
        firstname: "normalo2",
        lastname: "normalo2",
        street: "street",
        zip: "12450",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: false,
        owner: "normalo"
    };

    admina_contacts.push(contact1);
    admina_contacts.push(contact2);
    normalo_contacts.push(contact3);
    normalo_contacts.push(contact4);

}

function addContactsToList(array) {
    for
}  

function logout(){
    isLoggedIn = false;
    showLoginScreen();
}
