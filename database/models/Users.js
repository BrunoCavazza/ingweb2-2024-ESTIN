// models/Account.js
var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
    name: "Users",
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
        email: {
            type: "varchar",
            nullable: false
        },
        password:{
            type: "varchar",
            nullable: false
        }
    }
});
