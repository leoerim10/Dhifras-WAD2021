conn = Mongo();
db = conn.getDB("adviz");

db.createCollection("contacts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "contact's first name"
                },
                lastName: {
                    bsonType: "string",
                    description: "contacts last name"
                },
                streetNumber: {
                    bsonType: "string",
                    description: "Street and House Number of a contact"
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
                isPublic: {
                    bsonType: "bool",
                    default: "true",
                },
                owner: {
                    bsonType: "objectId",
                },
                lat: {
                    bsonType: "string",
                    description: "geo c"
                },
                lon: {
                    bsonType: "string",
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
