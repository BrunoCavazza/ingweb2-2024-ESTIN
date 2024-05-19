const {Sequelize} = require('sequelize')
const User = require('../models/users')

class CustomerServices {

    constructor(){

    }
    async getCustomerByEmail(email){
        const customer = await User.findOne({
            where: {
                email: email
            }
        });
        return customer;
    }

    





}

module.exports = CustomerServices;
