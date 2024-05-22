var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Tranfers",
    columns: {
        id: {
            primary: true,
            type: "bigint",
            generated: true
        },
        created_at: {
            type: "timestamp",
            createDate: true
        },
        modified_at: {
            type: "timestamp",
            updateDate: true
        },
    }
});