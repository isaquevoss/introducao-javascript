const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class Turma extends Model { }

Turma.init({
    nome: {
        type: DataTypes.STRING,
        length: 100,
    },
    periodo: {
        type: DataTypes.STRING
    },
}, {
    tableName: 'turmas',
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'Turma' // We need to choose the model name
});

module.exports = { Turma };