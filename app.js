const express = require('express')
const cors = require('cors')

const app = express()
const port = 3010

const allRouter = require('./router/all');
const router = require('./router/all');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(allRouter);
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})