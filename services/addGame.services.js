const Games = require('../models/games');


class AddGameServices{
    constructor(){}

    async createGame(game){
        const newGame = new Games();
        newGame.create(game);
        console.log()
    }

}