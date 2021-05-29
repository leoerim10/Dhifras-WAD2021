// map
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=AppM75r8Qr01WTE3yKsT',{
                            tileSize: 512,
                            zoomOffset: -1,
                            minZoom: 1,
                            attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                            crossOrigin: true
                        }).addTo(map);
var marker = L.marker([52.5079, 13.3378]).addTo(map);
var marker = L.marker([52.5945, 13.3501]).addTo(map);
var marker = L.marker([52.613, 13.145]).addTo(map);
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
        showFailedLoginMessage();
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

    console.log(contact);

    if(owner == "normalo"){
        normalo_contacts.push(contact);
    } else {
        admina_contacts.push(contact);
    }
    showMainScreen();
});

function showAdminaContacts() {
    if(currentUser == "admina"){
        for(let i=0; i<admina_contacts.length;i++){                
            let name = admina_contacts[i].firstname + " " + admina_contacts[i].lastname;
            addContactToList(name);
        }
    } else {
        for(let i=0;i<admina_contacts.length;i++){
            if(admina_contacts[i].owner == "normalo"){
                let name = admina_contacts[i].firstname + " " + admina_contacts[i].lastname;
            addContactToList(name);
            }
        }
    }
}

function showNormaloContacts() {
    for(let i=0; i<normalo_contacts.length;i++){
        let name = normalo_contacts[i].firstname + " " + normalo_contacts[i].lastname;
        addContactToList(name);
    }
}

function addContactToList(text){
    let node = document.createElement('li');
    node.className="list-group-item";
    let textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById("contact-list").appendChild(node);
}

function clearContactList(){
   var node = document.getElementById("contact-list");
   while(node.firstChild){
       node.removeChild(node.lastChild);
   } 
}

function showAllContacts() {
    clearContactList();
    if(currentUser == "admina"){
        showAdminaContacts();
        showNormaloContacts();
    } else {
        showNormaloContacts();
    }
}

function showContacts() {
    clearContactList();
    if(currentUser == "admina"){
        showAdminaContacts();
    } else {
        showNormaloContacts();
    }
}

function logout(){
    hideFailedLoginMessage();
    isLoggedIn = false;
    showLoginScreen();
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

function showLoginScreen() {
    hideFailedLoginMessage();
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


    //clear contact-list
    clearContactList();

    if(currentUser == "admina") {
        document.getElementById("user-greeting").innerHTML = "Hallo, admina!";
        //populate contact list
        showAdminaContacts()
    } else {
        document.getElementById("user-greeting").innerHTML = "Hallo, normalo!";
        //populate contact list
        showNormaloContacts();
        
    }
}

function showFailedLoginMessage() {
    document.getElementById("error-message").style.display = "block";
}

function hideFailedLoginMessage(){
    document.getElementById("error-message").style.display = "none";
}