const express = require('express');
const crypt = require('../utils/crypt.js');
const router = express.Router();


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
    
    const passwordHash = await crypt.generatePassswordHash(password1);
    const dn = Date.now().toString();
    const newUser = new User({
        username: username,
        passwordHash: passwordHash,
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
    let valid = await crypt.checkPassword(user.passwordHash, password)
    if (valid == false){
        res.status(401).json({
            "messsage": "Authentication failed",
        });
        return
    }

    res.status(200).json({
        "message": "Authenticated"
    })
});

router.post("/contacts", (req, res) => {
    const dn = Date.now().toString();
    const newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        streetNumber: req.body.streetNumber,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        isPublic: req.body.isPublic,
        owner: req.body.Owner,
        geoCords: req.body.geoCords,
        createdAt: dn,
        modifiedAt: dn,
    });

    newContact.save(function(err) {
        if(err){
            return res.statusCode(500)
        }
    });

    console.log(newContact);

    return res.status(201);
});

router.get("/contacts", async (req, res) => {
    let id = req.query.id;
    try {
        let contacts = await Contact.find({"owner": id});
        return res.status(200).json({
            "contacts": contacts,
        });
    } catch (e){
        return res.status(400).json({
            "message": "Invalid owner id",
        });
    }
});

router.put("/contacts/:id", (req, res) => {
    return res.statusCode(204)
});

router.delete("/contacts/:id", (req, res) => {
    let id = req.params.id;
    Contact.deleteOne({"_id": id})
    return res.statusCode(204);
});



module.exports = router;