const GameServices = require('../services/game.services');
const gameService = new GameServices();


/*const filterCategory = async (req, res) =>{
    try {
        const response = await game.getGameByCategory(req.params.category);
        res.json({message: 'Juegos filtrados por categoria', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}*/

/*const filter = async (req, res) =>{
    try {
        console.log(req.params)
        const response = await gameService.getGamesByFilter(req.params);
        res.json({message: 'Juegos filtrados ', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}*/

const getGamesPaged = async (req, res) =>{
    console.log("aber q onda la query esta filtradora")
    console.log(req.query)
    console.log(req.body)
    try{
        const response = await gameService.getGamesByFilter(req.query.category, req.body, req.query.page);
        res.status(200).json(response);
    }catch(error){
        res.status(500).send({message: error.message});
    }
    
}

const getAll = async (req, res) =>{
    try {
        const response = await gameService.getAllGames();
        res.status(200).json({message: 'Todos los juegos', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

/*const getGamesPaged = async (req, res) =>{
    console.log("params: ")
    console.log(req.query)
    console.log("body:")
    console.log(req.body)
    try { 
        const response = await gameService.getGamesPaged(req.query.page-1);

        const responseArray = []
        for (let i = 0; i < response.length; i++){
            responseArray.push(response[i])
        }
        res.status(200).send(responseArray);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}*/



const gameScreen = async (req, res) =>{
    try {
        const response = await game.getGameById(req.query.id);
        res.status(200).json({message: 'Juego encontrado', data: response});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}


module.exports = {/*filter,*/ getAll, getGamesPaged, gameScreen};