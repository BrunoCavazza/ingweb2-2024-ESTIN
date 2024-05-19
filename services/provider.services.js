const Sequelize = require('sequelize')
const User = require('../models/users')

class ProviderServices {

    constructor(){
        
    }

    async getProviderByEmail(email){
        const provider = await User.findOne({
            where: {
                email: email
            }
        });
        return provider;
    }






}

module.exports = ProviderServices;
