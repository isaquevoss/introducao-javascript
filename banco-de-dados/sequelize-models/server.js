const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { sequelize } = require("./db");
const { Aluno } = require('./models/aluno_model');
const { Professor } = require('./models/professor_model');
const { User } = require('./models/user_model');
const { Turma } = require('./models/turma_model')
const app = express();
app.use(bodyParser.json());
app.use(cors());

const APP_KEY = 'APP_KEY';
const APP_REFRESH_KEY = 'APP_REFRESH_KEY'

app.post('/users', async (req, res) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    res.send(user);
})
app.post('/login', async (req, res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
        return res.status(400).send('User not found');
    }
    if (user.password !== req.body.password) {
        return res.status(400).send('Invalid password');
    }
    return res.json({
        accessToken: jwt.sign({ userId: user.id }, APP_KEY, { expiresIn: 60 }),
        refreshToken: jwt.sign({ userId: user.id }, APP_REFRESH_KEY, { expiresIn: 60 * 60 * 24 * 7 })
    });
});

app.post('/valid-token', (req, res) => {
    try {
        jwt.verify(req.body.accessToken, APP_KEY);
        res.json({ message: 'JWT is valid' });
    } catch (error) {
        res.json({ message: 'JWT is invalid' });
    }    
})

app.post('/token/refresh', (req,res) => {
    const payload = jwt.verify(req.body.refreshToken, APP_REFRESH_KEY);
    if (!payload) {
        return res.status(400).send('Invalid refresh token');
    }
    return res.json({
        accessToken: jwt.sign({ userId: payload.userId }, APP_KEY, { expiresIn: 60 }),
        refreshToken: jwt.sign({ userId: payload.userId }, APP_REFRESH_KEY, { expiresIn: 60 * 60 * 24 * 7 })
    });
})

app.use((req, res, next) => {
    try {
        jwt.verify(req.headers.authorization, APP_KEY);
        next();
    } catch (error) {
        res.json({ message: 'Usuário não está autorizado' }).sendStatus(401);
    }
})

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

//registrar usuário

//fazer login

//TESTAR No postman requests com o token, sem o token e 
//com o token inválido

//deixar o token expirar e testar com ele expirado

//fazer o refresh token

//mudar a validade token/refresh para 1 dia, 1 mes, 1hora
//decodicar no jwt.io e verificar os dados de expiracao

//mudar a APP_KEY, APP_REFRESH_KEY e tentar usar um token antigo