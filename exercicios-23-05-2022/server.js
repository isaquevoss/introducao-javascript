const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`Request received: ${Date()}`)
    console.log(`request método: ${req.method}`)
    console.log(`request url: ${req.url}`)
    console.log(`request body: ${JSON.stringify(req.body)}`)
    console.log(`request ip: ${req.ip}`)
    next();
})



app.get('/', (req, res) => {
    res.json('Bem vindo a api de exercicios do dia 20/05/2022')
})

app.get('/token', (req, res) => {
    res.send(jwt.sign('dado do meu payload', 'outra chave'))
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
    const token = req.headers.authorization;
    console.log(`middleware de validação do token`)
    console.log(`token: ${token}`)
    jwt.verify(token, 'outra chave');
    next();
});
app.use((req, res, next) => {
    if (req.method == 'POST') {
        const payload = jwt.decode(req.headers.authorization);
        if (!payload.canPost)
            return res.send('Você não tem permissão para postar')
    }
    next();
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

app.post('/teste', (req, res) => {
    res.send('retorno de uma rota post')
})


app.use((req, res, next) => {

    console.log('middleware geral')
    next();
});

app.use('/products', (req, res, next) => {
    const payload = jwt.decode(req.headers.authorization);
    if (!payload.canAccessProducts) {
        return res.send('vc não tem acesso as rotas de produtos')
    }
    next();
})

app.get('/products', (req, res) => {
    res.send('rota get produtos')

});
app.post('/products', (req, res) => {
    res.send('rota post produtos')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})