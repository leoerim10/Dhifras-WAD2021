var isLoggedIn = false;
var currentUser = "";
if (isLoggedIn != true){
    showLoginScreen();
}

/* map */
var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=AppM75r8Qr01WTE3yKsT',{
                            tileSize: 512,
                            zoomOffset: -1,
                            minZoom: 1,
                            attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
                            crossOrigin: true
                        }).addTo(map);

var marker = new Array();
function setMarkers(array) {
    console.log("setmarkers")
    for(let i = 0; i<array.length;i++){
        var LamMarker = new L.marker([array[i].lat, array[i].lon]);
        marker.push(LamMarker);
        map.addLayer(marker[i]);
    }
}

function clearMap(){
    console.log("clearmap")
    for(i=0;i<marker.length;i++) {
        map.removeLayer(marker[i]);
    } 
    marker = [];
}
/* end map */

/* contacts */
var contacts = new Array();
populateContacts();
/* end contacts */

/* login / logout functions */
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

/* login error handling */
function showFailedLoginMessage() {
    document.getElementById("error-message").style.display = "block";
}

function hideFailedLoginMessage(){
    document.getElementById("error-message").style.display = "none";
}
function logout(){
    hideFailedLoginMessage();
    isLoggedIn = false;
    showLoginScreen();
}

/*end login / logout functions */

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
    
    if(owner == "Self"){
        if(currentUser == "admina"){
            owner = "admina"
        } else {
            owner = "normalo"
        }
    }

    let contact = {
        id: contacts.length + 1,
        firstname: firstname,
        lastname: lastname,
        street: street,
        zip: zip,
        city: city,
        state: state,
        country: country,
        private: private,
        owner: owner,
        lat: "",
        lon: ""
    };

    let request = new XMLHttpRequest();
    let baseUrl = "https://nominatim.openstreetmap.org/search/";
    let formattedStreet = contact.street.replace(/\s/g, "%20");
    console.log(formattedStreet)
    let url = baseUrl + `${formattedStreet}%20${contact.zip}%20${contact.city}%20${contact.state}%20${contact.country}?format=json&addressdetails=1&limit=1`;
    console.log(url);

    request.open("GET", url, true);

    request.onerror = function(){
        console.log("Connecting to the url failed");
        return
    };

    request.onload = function(e) {
        let data = this.response;
        let obj = JSON.parse(data);
        console.log(obj);
        if(this.status == 200){
            contact.lat = obj[0].lat;
            contact.lon = obj[0].lon;
        } else {
            return
        }
    };

    request.send();

    contacts.push(contact);
    showMainScreen();
});



function showAdminaContacts() {
    for(let i=0;i<contacts.length;i++){
        if(contacts[i].owner == "admina"){
            addContactToList(`ID:${contacts[i].id} Firstname:${contacts[i].firstname} Lastname:${contacts[i].lastname}`, contacts[i].id);
        }
    }
}

function showNormaloContacts() {
    for(let i=0; i<contacts.length;i++){
        if(contacts[i].owner == "normalo"){
            addContactToList(`ID:${contacts[i].id} Firstname:${contacts[i].firstname} Lastname:${contacts[i].lastname}`, contacts[i].id);
        }
    }
}

function addContactToList(text, id){
    let node = document.createElement('li');
    node.className="list-group-item";
    node.setAttribute("onclick", `updateContact(${id})`);
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
        for(let i=0; i<contacts.length;i++){
            addContactToList(`ID:${contacts[i].id} Firstname:${contacts[i].firstname} Lastname:${contacts[i].lastname}`, contacts[i].id);
        }
    } else {
        for(let i=0; i<contacts.length;i++){
            if((contacts[i].owner == "admina") && (contacts[i].private == true)){
                continue;
            } else {
                addContactToList(`ID:${contacts[i].id} Firstname:${contacts[i].firstname} Lastname:${contacts[i].lastname}`, contacts[i].id);
            }
        }
    }
}

function showMyContacts() {
    clearContactList();
    if(currentUser == "admina"){
        showAdminaContacts();
    } else {
        showNormaloContacts();
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
    clearContactList();
    //clearMap();

    if(currentUser == "admina") {
        document.getElementById("user-greeting").innerHTML = "Hallo, admina!";
        showAdminaContacts();
    } else {
        document.getElementById("user-greeting").innerHTML = "Hallo, normalo!";
        showNormaloContacts();
    }
}

var updatecontactform = document.getElementById("update-contact-form");
updatecontactform.addEventListener('submit', function(event){
    event.preventDefault();
    let firstname = document.getElementById("update-contact-firstname").value;
    let lastname = document.getElementById("update-contact-lastname").value;
    let street = document.getElementById("update-contact-street").value;
    let zip = document.getElementById("update-contact-zip").value;
    let city = document.getElementById("update-contact-city").value;
    let state = document.getElementById("update-contact-state").value;
    let country = document.getElementById("update-contact-country").value;
    let private = document.getElementById("update-contact-private-public-checkbox").value;
    let owner = document.getElementById("update-contact-owner").value;

    if(owner == "Self"){
        if(currentUser == "admina"){
            owner = "admina"
        } else {
            owner = "normalo"
        }
    }

    let id = document.getElementById("update-contact-firstname").getAttribute("userid");
    console.log("id: " + id);
    let contact = {
        id: id,
        firstname: firstname,
        lastname: lastname,
        street: street,
        zip: zip,
        city: city,
        state: state,
        country: country,
        private: private,
        owner: owner,
        lat: "",
        lon: ""
    }

    let request = new XMLHttpRequest();
    let baseUrl = "https://nominatim.openstreetmap.org/search/";
    let formattedStreet = contact.street.replace(/\s/g, "%20");
    console.log(formattedStreet)
    let url = baseUrl + `${formattedStreet}%20${contact.zip}%20${contact.city}%20${contact.state}%20${contact.country}?format=json&addressdetails=1&limit=1`;
    console.log(url);

    request.open("GET", url, true);

    request.onerror = function(){
        console.log("Connecting to the url failed");
        return
    };

    request.onload = function(e) {
        let data = this.response;
        let obj = JSON.parse(data);
        console.log(obj);
        if(this.status == 200){
            contact.lat = obj[0].lat;
            contact.lon = obj[0].lon;
        } else {
            return
        }
    };

    request.send();
    updateContactByID(id, contact);
    showMainScreen();
    
});

function updateContact(id){
    let contact = getContactByID(id);
    //add
    let deleteButton = document.getElementById("delete-button");
    deleteButton.setAttribute("onclick", `deleteContact(${id})`);
    document.getElementById("update-contact-firstname").setAttribute("userid", id);
    document.getElementById("update-contact-firstname").defaultValue=contact.firstname;
    document.getElementById("update-contact-lastname").defaultValue=contact.lastname;
    document.getElementById("update-contact-street").defaultValue=contact.street;
    document.getElementById("update-contact-zip").defaultValue=contact.zip;
    document.getElementById("update-contact-state").defaultValue=contact.state;
    document.getElementById("update-contact-city").defaultValue=contact.city;
    document.getElementById("update-contact-country").defaultValue=contact.country;
    document.getElementById("update-contact-firstname").defaultValue=contact.firstname;
    document.getElementById("update-contact-private-public-checkbox").defaultValue=contact.private;
    if(currentUser == "admina" && contact.owner == "admina"){
        document.getElementById("update-contact-owner").defaultValue="Self";
    } else if (currentUser == "normalo" && contact.owner == "normalo"){
        document.getElementById("update-contact-owner").defaultValue="Self";
    }
    showUpldateDeleteContactScreen();
}

function getContactByID(id) {
    for(let i = 0;i<contacts.length;i++){
        if(contacts[i].id == id){
            return contacts[i];
        }
    }
}

function updateContactByID(id, newContact){
    for(let i=0;i<contacts.length;i++){
        if(contacts[i].id == id){
            contacts[i] = newContact;
            return
        }
    }
}


function populateContacts() {
    let contact1 = {
        id: 1,
        firstname: "Max",
        lastname: "Müller",
        street: "Europaplatz 1",
        zip: "10557",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: true,
        owner: "admina",
        lat: "52.5257446",
        lon: "13.3685935"
    };

    let contact2 = {
        id: 2,
        firstname: "Hanna",
        lastname: "Maier",
        street: "Georgen Strasse 17",
        zip: "10117",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: false,
        owner: "admina",
        lat: "52.5197592",
        lon: "13.3868809"
    };

    let contact3 = {
        id: 3,
        firstname: "Leo",
        lastname: "Schmidt",
        street: "Dircksen Strasse 2",
        zip: "10179",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: true,
        owner: "normalo",
        lat: "52.5211976",
        lon: "13.4118911"
    };

    let contact4 = {
        id: 4,
        firstname: "Marc",
        lastname: "Stegen",
        street: "Berliner Strasse 44",
        zip: "10173",
        city: "Berlin",
        state: "Berlin",
        country: "Germany",
        private: false,
        owner: "normalo",
        lat: "52.5606059",
        lon: "13.4123837"
    };

    contacts.push(contact1);
    contacts.push(contact2);
    contacts.push(contact3);
    contacts.push(contact4);
}

function deleteContact(id) {
    for(let i=0;i<contacts.length;i++){
        if(contacts[i].id == id){
            contacts.splice(i, 1);
        }
    }
    showMainScreen();
}

