const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Professor extends Model {}

Professor.init({
  nome: {
    type: DataTypes.STRING,
    length: 100,
  },
  email: {
    type: DataTypes.STRING
  },
  dataNascimento: {
    type: DataTypes.STRING
  }
}, {
  // Other model options go here
  sequelize: sequelize, // We need to pass the connection instance
  modelName: 'Professor' // We need to choose the model name
});

module.exports = { Professor };