const express = require('express')
const cors = require('cors')

const app = express()
const port = 3010

const appDataSource = require('./database/appSourceDataBase');

const allRouter = require('./router/all');
const router = require('./router/all');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

appDataSource.initialize()
  .then(() => {
      console.log('Conexión con la base de datos establecida');
      //Publico
      app.use(allRouter);
      app.use(router);
          
      app.listen(port, () => {
          console.log(`App running on PORT: ${port}`);
      });
  })
  .catch((error) => {
      console.error('Failed to establish database connection', error);
  });

  
