const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

class User extends Model { }

User.init(
    {

        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            
            
        },
        can_create_alunos: {
            type: DataTypes.BOOLEAN
        },
        can_create_professores: {
            type: DataTypes.BOOLEAN
        },
    }, {
    
    // Other model options go here
    sequelize: sequelize, // We need to pass the connection instance
    modelName: 'user' // We need to choose the model name
})

module.exports = { User };