module.exports = mongoose => {
    const User = mongoose.model(
        "user",
        mongoose.Schema({
            username: String,
            email: String,
            passwordHash: String,
            createdAt: String,
            modifiedAt: String
        })
    )

    return User;
};