const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json('Bem vindo a api de exercicios do dia 20/05/2022')
})

app.get('/token', (req, res) => {
    res.send(jwt.sign('dado do meu payload', 'outra chave'))
})
app.get('/token/valid/:token', (req, res) => {
    try {
        const token = req.params.token;
        const payload = jwt.verify(token, 'outra chave')
        res.json({ message: "token é valido", payload: payload })
    } catch (error) {
        console.log('erro ao validar o token');
        res.json({ message: "token é invalido", error: error })
    }
})

app.get('/token/:payload', (req, res) => {
    const payload = req.params.payload
    const token = jwt.sign(payload, 'outra chave')
    res.send(token)
})

app.post('/token', (req, res) => {
    const payload = req.body;
    const token = jwt.sign(payload, 'outra chave', { expiresIn: 3600 })
    res.send(token)
})

app.use((req, res, next) => {

    console.log('middleware geral')
    next();
});

app.use((req, res, next) => {
 
    console.log('middleware post')
    next();
})

app.get('/nova-rota', (req, res) => {
    console.log('teste')
    res.send('teste');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})