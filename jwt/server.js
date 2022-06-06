const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const jwtHelper = require('./jwt');

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'admin' && password === 'admin') {
        const token = jwtHelper.gerarJwt({ username });
        res.json({ token });
    }
    else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
})

app.use((req, res, next) => {
    const token = req.headers.authorization;
    try {
        if (token) {
            jwtHelper.validarJwt(token);
            next();            
        } else {
            throw new Error('Token não encontrado');
        }

    } catch (error) {
        res.status(401).json({ error: error.message });

    }

})

app.get('/products', (req, res) => {
    res.send('rota de produtos');
})


app.listen(3000, () => {
    console.log('Server started on port 3000');
});