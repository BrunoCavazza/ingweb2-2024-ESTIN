const {DataTypes} = require('sequelize');
const {sequelize} = require('../models')
const User = require('../models/users')(sequelize, DataTypes);

class ProviderServices {

    constructor(){
        
    }

    async getProviderByUsername(username){

        const provider = await User.findOne({
            where: {
                username: username
            }
        });
        return provider;
    }






}

module.exports = ProviderServices;
