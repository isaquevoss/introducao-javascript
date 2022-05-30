const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { sequelize } = require('./db');
const { User } = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/register', async (req, res) => {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.can_create_alunos = req.body.can_create_alunos;
    user.can_create_professores = req.body.can_create_professores;
    await user.save();
    res.send(user);
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            email: req.body.email,
            password: req.body.password
        }
    });
    if (!user) {
        return res.status(404).send('User not found');
    }
    const token = jwt.sign({ user: user }, 'MY_SECRET_KEY', { expiresIn: 3600 });
    res.json({ accessToken: token });
})

app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (!token)
            throw new Error('No token provided');

        if (token) {
            const decoded = jwt.verify(token, 'MY_SECRET_KEY');
            req.user = decoded.user;
            console.log(`user connected: ${req.user.email}`);
            return next();
        }
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
})

app.use('/alunos', (req, res, next) => {
    const user = jwt.decode(req.headers.authorization).user;
    if (!user.can_create_alunos) {
        return res.status(401).send('Unauthorized');
    }
    next();
})

app.get('/alunos', (req, res) => {
    res.send('Alunos');
})

app.use('/professores', (req, res, next) => {
    const user = jwt.decode(req.headers.authorization).user;
    if (!user.can_create_professores) {
        return res.status(401).send('Unauthorized');
    }
    next();
})

app.get('/professores', (req, res) => {
    res.send('professores');
});

app.listen('3000', () => {
    sequelize.sync();
    console.log('Server is running on port 3000');
})