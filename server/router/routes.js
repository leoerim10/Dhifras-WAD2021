const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const Contact = require('../models/Contact.js')

router.post("/login", (res, req) => {

});

router.post("/contacts", (req, res) => {
    
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
    let id = req.params.id;
    let newContact = req.body;
});

router.delete("/contacts/:id", (req, res) => {
    console.log("contacts delete")
});

module.exports = router;