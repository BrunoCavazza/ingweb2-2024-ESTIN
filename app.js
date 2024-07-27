const express = require('express')
const cors = require('cors');
const router = require('./router/all');

const app = express()
const port = 3010
const {randomOnSale, originalPrices} = require('./utils/randomOnSale');
const pickRandom = require('./utils/pickRandom');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
//const allRouter = require('./router/all');
//const router = require('./router/all');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webSocket = require('ws');

/*app.use((req, res) => {
    res.status(404).send('Not Found');
})*/

app.use(router);

async function gracefulShutdown() {
    console.log('Shutting down');
    /*console.log("check check")
    console.log(originalPrices)
    for (let [gameId, originalPrice] of originalPrices) {
        console.log("SEXOOOOOO")
        let restored = await prisma.games.update({
          where: { id: gameId },
          data: { price: originalPrice }
        });
        console.log(restored)
    }
    console.log(restored)
    console.log('Original prices restored');*/
    await prisma.$disconnect();
    process.exit(0);
}

const webSocketServer = new webSocket.Server({ noServer: true });

async function getGamesCount(){
    const count = await prisma.games.count();
    return count;
}



app.listen(port, async () => {
    console.log(`Running on port http://localhost:${port}`);
    /*await randomOnSale();*/
    await pickRandom();
});

process.on('SIGTERM', async () =>{ 
    
    gracefulShutdown().catch(err => {
        console.error("error en cierre: ", err);
        process.exit(1);
    })
});
process.on('SIGINT', async () => {
    try {
        await gracefulShutdown();
        process.exit(0);
    } catch (err) {
        console.error("error en cierre: ", err);
        process.exit(1);
    }
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

