const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "admin",
   "password": "alejandros",
   "database": "mydatabase",
   "synchronize": true,
   "logging": false,
   "entities": [
        require("./models/Users"),
        require("./models/Tranfers"),
   ],
});

module.exports = appDataSource;
