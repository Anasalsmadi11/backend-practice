const { sequelize, DataTypes } = require('./index');


const ClaimedDeals = (sequelize, DataTypes) =>sequelize.define('claimeddeals', {

    User_ID: {
      type: DataTypes.INTEGER,
    },
    Deal_ID: {
      type: DataTypes.INTEGER,
    },
    Server_DateTime: {
      type: DataTypes.DATE,
    },
    DateTime_UTC: {
      type: DataTypes.DATE,
    },
    Amount: {
      type: DataTypes.FLOAT,
    },
    Currency: {
      type: DataTypes.STRING,
    },
  });
  
  module.exports= ClaimedDeals