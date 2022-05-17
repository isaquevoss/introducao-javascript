const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class User extends Model { }

User.init({
  email: {
    type: DataTypes.STRING,
    
  },
  password: {
    type: DataTypes.STRING
  }
}, {  
  // Other model options go here
  sequelize: sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

module.exports = { User };