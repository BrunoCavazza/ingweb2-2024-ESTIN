const { DataSource } = require('typeorm');

const connectJson = {
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
        require("./models/Transfers"),
   ],
}

if(process.env.ENVIROMENT == 'dev'){
   delete connectJson.ssl;
}

const appDataSource = new DataSource(connectJson);

module.exports = appDataSource;
