const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

mongoose.connect("mongodb://root:password@localhost:27017/admin?authSource=admin&readPreference=primary&gssapiServiceName=mongodb&appname=MongoDB%20Compass&ssl=false", 
{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:true })
.then(() => {
    console.log("[+] Connected to the database on port 27017!");
})
.catch(err => {
    console.log(err);
    return;
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use('/api', require('./router/routes.js'))

app.listen(PORT, () => {
    console.log(`Server running on port :${PORT}`);
});