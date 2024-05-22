const {DataTypes} = require('sequelize');
const {sequelize} = require('../models')
const User = require('../models/users')(sequelize, DataTypes);

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
