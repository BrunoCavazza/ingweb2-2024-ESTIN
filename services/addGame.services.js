const {DataTypes} = require('sequelize');
const {sequelize} = require('../models')
const Games = require('../models/games')(sequelize, DataTypes);


class AddGameServices{
    constructor(){

    }

    async createGame(newGame){

        const createResponse = await Games.findOrCreate({
            where: {
                name: newGame.name
            },
            defaults: {
                name: newGame.name,
                owner: newGame.owner,
                description: newGame.description,
                pictures: newGame.pictures
            }
        });

    }

}

module.exports = AddGameServices;