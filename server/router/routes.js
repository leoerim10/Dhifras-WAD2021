const express = require('express');
const crypt = require('../utils/crypt.js');
const router = express.Router();

//database models
const User = require('../models/User.js');
const Contact = require('../models/Contact.js')

router.post("/register", async (req, res) => {
    const { username, password1, password2 } = req.body;

    //validate input data
    if (password1 != password2) {
        return res.status(400).json({
            "message": "Passwords do not match",
        });
    }

    var isAdmin = false;
    if(username == "admina"){
        isAdmin = true;
    }
    
    const passwordHash = await crypt.generatePassswordHash(password1);
    const dn = Date.now().toString();
    const newUser = new User({
        username: username,
        passwordHash: passwordHash,
        isAdmin: isAdmin,
        createdAt: dn,
        updatedAt: dn
    });

    newUser.save(function(err, u){
        if(err){
            return res.statusCode(500);
        }
        return res.status(201).json(u);
    });
})


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    //get users password from the database
    const user = await User.findOne({"username": username})
    if(user == null){
        return res.status(404).json({
            "message": "User not found"
        });
    }
    let valid = await crypt.checkPassword(user.passwordHash, password)
    if (valid == false){
        return res.status(401).json({
            "messsage": "Authentication failed",
        });
    }

    return res.status(200).json({
        message: "Authenticated",
        user: username
    })
});

router.post("/contacts", (req, res) => {
    console.log("[*] Adding a new contact...")
    const dn = Date.now().toString();
    const newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetNumber: req.body.streetNumber,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        isPublic: req.body.isPublic,
        owner: req.body.owner,
        lat: req.body.lat,
        lon: req.body.lon,
        createdAt: dn,
        modifiedAt: dn,
    });

    newContact.save(function(err) {
        if(err){
            return res.statusCode(500)
        }
    });

    console.log(newContact);

    return res.status(201).json({
        id: newContact.id
    });
});

router.get("/contacts", async (req, res) => {
    let owner = req.query.userid;
    console.log(owner);
    if(owner == "" || owner === undefined){
        let contacts = await Contact.find();
        console.log(contacts);
        return res.status(200).json({
            "contacts": contacts,
        });
    } else {
        let contacts = await Contact.find({"owner": owner});
        return res.status(200).json({
            "contacts": contacts
        });
    }
});

router.put("/contacts/:id", async (req, res) => {
    let id = req.params.id;
    if(id == "" || id === undefined){
        res.status(400).json({
            "message": "invalid request",
        });
    }

    const dn = Date.now().toString();
    let newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetNumber: req.body.streetNumber,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        isPublic: req.body.isPublic,
        owner: req.body.owner,
        lat: req.body.lat,
        lon: req.body.lon,
        createdAt: req.body.createdAt,
        modifiedAt: dn,
    };

    let doc = await Contact.updateOne({"_id": id}, newContact, {
        returnOriginal: false
    });

    console.log(doc);

    return res.status(204).send();

});

router.delete("/contacts/:id", (req, res) => {
    let id = req.params.id;
    if(id == "" || id === undefined){
        res.status(400).json({
            "message": "invalid request",
        });
    }
    Contact.findByIdAndDelete(id, (err) => {
        if(err){
            if(err.name == "CastError"){
                return res.status(400).json({
                    "message": "invalid id"
                });
            } else {
                return res.status(500).json(err);
            }
        }
        return res.status(204).send();
    })
});

module.exports = router;