const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

class Aluno extends Model { }
Aluno.init({
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
   
    sequelize: sequelize, 
    modelName: 'Aluno' 
});

module.exports = { Aluno };