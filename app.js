const express = require('express')
const cors = require('cors');
const router = require('./router/all');

const app = express()
const port = 3010

//const appDataSource = require('./db/db.js');

//const allRouter = require('./router/all');
//const router = require('./router/all');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {res.send("hello world :>")})

/*app.use((req, res) => {
    res.status(404).send('Not Found');
})*/

app.use(router);

app.listen(port, ()=> {
    console.log(`Running on port http://localhost:${port}`);
});
/*appDataSource.initialize()
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
*/

