'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users= require('./users/model')
let deal= require('./deals')
let claimedDeals= require('./claimedDeals')

// const userModel = users(sequelize, DataTypes)
const sequelize = new Sequelize(process.env.DATABASE_URL, {});


module.exports = {
    sequelize:sequelize,  
     users:users(sequelize, DataTypes),
     deals:deal(sequelize, DataTypes),
     claimedDeals:claimedDeals(sequelize, DataTypes)
     };