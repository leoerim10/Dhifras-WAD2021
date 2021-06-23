conn = Mongo();
db = conn.getDB("adviz");

db.createCollection("contacts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                firstname: {
                    bsonType: "string",
                },
                lastname: {
                    bsonType: "string",
                },
                street: {
                    bsonType: "string",
                },
                city: {
                    bsonType: "string",
                },
                state: {
                    bsonType: "string",
                },
                country: {
                    bsonType: "string",
                },
                private: {
                    bsonType: "bool",
                },
                owner: {
                    bsonType: "objectId",
                },
                lat: {
                    bsonType: "string",
                },
                lon: {
                    bsonType: "string",
                },
                created_at: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last created.",
                    pattern : "^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$"
                },
                modified_at: {
                    bsonType: "string",
                    description: "RFC3339 time stamp, that shows when the entry was last modified.",
                    pattern : "^\\d{4}-\\d{2}-\\d{2}T\\d{2}%3A\\d{2}%3A\\d{2}(?:%2E\\d+)?[A-Z]?(?:[+.-](?:08%3A\\d{2}|\\d{2}[A-Z]))?$"
                },
            },
        },
    },
});