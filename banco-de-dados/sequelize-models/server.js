const express = require('express')
const bodyParser = require('body-parser')
const { sequelize } = require("./db");
const { Aluno } = require('./models/aluno_model');
const { Professor } = require('./models/professor_model');
const { User } = require('./models/user_model');
const { Turma } = require('./models/turma_model')
const app = express();
app.use(bodyParser.json());

app.get('/alunos', async (req, res) => {
    const alunos = await Aluno.findAll();
    res.json(alunos);
});
app.get('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno)
        return res.status(404).send("Aluno não encontrado");
    res.json(aluno);
});
app.post('/alunos', async (req, res) => {
    const aluno = new Aluno();
    aluno.nome = req.body.nome;
    aluno.email = req.body.email;
    aluno.dataNascimento = req.body.dataNascimento;
    await aluno.save();
    return res.json(aluno);
});
app.put('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno)
        return res.status(404).send('Aluno não encontrado');
    aluno.nome = req.body.nome;
    aluno.email = req.body.email;
    aluno.dataNascimento = req.body.dataNascimento;
    await aluno.save();
    return res.json(aluno);
})
app.patch('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno)
        return res.status(404).send("Aluno não encontrado");
    if (req.body.nome)
        aluno.nome = req.body.nome;
    if (req.body.email)
        aluno.email = req.body.email;
    if (req.body.dataNascimento)
        aluno.dataNascimento = req.body.dataNascimento;
    await aluno.save();
    return res.json(aluno);
});
app.delete('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    if (!aluno) {
        return res.status(404).send('Aluno não encontrado');
    }
    await aluno.destroy();
    return res.json({ message: 'Aluno removido com sucesso' });
});

app.listen(3000, async () => {
    await sequelize.sync();
    console.log('app is running on port 3000');
});