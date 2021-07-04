conn = Mongo();
db = conn.getDB("adviz");

db.createCollection("users", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "passwordHash"],
            properties: {
                username: {
                    bsonType: "string",
                    description: "username set when signing-up",
                },
                passwordHash: {
                    bsonType: "string",
                    description: "string with hash of users password",
                },
                createdAt: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last created.",
                },
                modifiedAt: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last modified.",
                },
            },
        },
    },
});
