const { Sequelize } = require('sequelize');

function connectSequelize() {
    return new Sequelize({
        dialect: 'sqlite',
        storage: './database.db',
        logging: true
    });
}

module.exports = { connectSequelize };