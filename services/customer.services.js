
const Sequelize = require('sequelize')

const User = require('../models/users')

class CustomerServices {

    constructor(){

    }
    async getCustomerByUsername(username){
        const customer = await User.findOne({
            where: {
                username: username
            }
        });
        return customer;
    }

    


}

module.exports = CustomerServices;
