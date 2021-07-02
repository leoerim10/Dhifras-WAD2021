const express = require('express');
const User = require('./models/User');

const router = express.Router();

router.post("/register", (req, res) => {
    console.log(req.body);

    res.status(200);
});

router.post("/login", (req, res) => {

});

router.post("/contacts", (req, res) => {

});

router.get("/contacts", (req, res) => {

});

router.put("/contacts", (req, res) => {

});

router.delete("/contacts", (req, res) => {

});