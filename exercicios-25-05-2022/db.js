const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',    
    sync: true
});

module.exports = { sequelize };