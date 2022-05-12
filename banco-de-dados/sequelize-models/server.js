const express = require('express')
const { sequelize } = require("./db");
const { Aluno } = require('./models/aluno_model');
const { Professor } = require('./models/professor_model');
const { User } = require('./models/user_model');
const { Turma } = require('./models/turma_model')
const app = express();



app.listen(3000, async () => {
    await sequelize.sync();
    console.log('app is running on port 3000');
});