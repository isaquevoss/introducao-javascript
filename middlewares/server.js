const express = require('express')
const app = express();
require('dotenv').config();
const token = process.env.TOKEN;
console.log(token);

app.use((req, res, next) => {
    console.log('passou no meu primeiro middleware');
    next();
})
app.use((req, res, next) => {
    console.log('ip: ' + req.ip+ ' se conectou');
    next();
})
app.use((req, res, next) => {
    console.log('requisição no metodo '+ req.method + ' na url ' + req.url);
    next();
})
app.use((req, res, next) => {
    if (req.headers.authorization == token) {
        next();
    } else {
        res.status(401).send('Não autorizado');
    }
})

app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/produtos/:id/grupo', (req, res) => {
    res.send('post produtos')
})


app.listen(3000,() => {
    console.log('Server is running on port 3000')
})