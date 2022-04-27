const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const apiKey = 'WJQFDnYwm2TL4wTgE9WUsM98qEr3UmWtEtTsxzQ4aNqr2P8i7s';
const db = {
    products: []
}

app.use(bodyParser.json())

app.get('/',(req,res) => {
    res.send('Esse é o software de automação do Joãozinho')
})

app.use((req,res,next) => {
    if (req.headers.api_key != apiKey) {
        res.status(401).send('Você não está autorizado')
    }
    else{
        next()
    }
})

app.get('/products',(req, res) => {
    res.json(db.products)
})

app.get('/products/:id',(req, res) => {
    res.json(db.products.find(p => p.id == req.params.id))
})

app.post('/products', (req,res)=>{
    db.products.push({
        id: db.products.length + 1,
        name: req.body.name,
        price: req.body.price,
        created_at: new Date(),
        updated_at: new Date()
    });
    res.json(db.products[db.products.length - 1]);
})

app.put('/products/:id',(req,res) => {
    const product = db.products.find(p => p.id == req.params.id)
    product.name = req.body.name
    product.price = req.body.price
    product.updated_at = new Date()
    res.json(product)
})

app.patch('/products/:id',(req,res) => {
    const product = db.products.find(p => p.id == req.params.id)
    if (req.body.name) {
        product.name = req.body.name
    }
    if (req.body.price) {
        product.price = req.body.price
    }
    product.updated_at = new Date();
    res.json(product)
})

app.delete('/products/:id',(req,res) => {
    db.products = db.products.filter(p => p.id != req.params.id)
    res.sendStatus(204);
})



app.listen(3000,() => {
    console.log('app  is running')
})
