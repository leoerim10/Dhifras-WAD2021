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
                email: {
                    bsonType: "string",
                    description: "email set when signing-up",
                },
                passwordHash: {
                    bsonType: "string",
                    description: "string with hash of users password",
                },
                createdAt: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last created.",
                    pattern : "^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$"
                },
                modifiedAt: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last modified.",
                    pattern : "^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$"
                },
            },
        },
    },
});
