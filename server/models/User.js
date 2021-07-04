const mongoose = require('mongoose');
const schema = mongoose.Schema({
    username: String,
    passwordHash: String,
    createdAt: String,
    updatedAt: String
});

module.exports = mongoose.model("User", schema);