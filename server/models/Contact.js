const mongoose = require('mongoose');
const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    streetNumber: String,
    city: String,
    state: String,
    country: String,
    isPublic: Boolean,
    owner: mongoose.Types.ObjectId,
    geoCords: {
        lat: String,
        lon: String
    },
    createdAt: String,
    modifiedAt: String
});


module.exports = mongoose.model("Contact", schema);