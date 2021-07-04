const bcrypt = require('bcrypt');

const generatePassswordHash = async (plainText) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainText, salt);
    return hashedPassword;
}

const checkPassword = async (hashedPassword, plainText) => {
    const valid = await bcrypt.compare(plainText, hashedPassword);
    console.log(valid);
    return valid;
}

module.exports = {
    generatePassswordHash,
    checkPassword
};