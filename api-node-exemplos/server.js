const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express();

app.use(bodyparser.json());
app.use(cors())

app.use((req, res, next) => {
    if ( req.ip == '::ffff:192.168.137.155'){
        console.log('forbidden');
        return res.sendStatus(403);
        
    }
    console.log('ip: ' + req.ip+ ' se conectou');
    console.log('requisição no metodo '+ req.method + ' na url ' + req.url);
    next();
})

const db = {
    leituras: []
};
app.get('/leituras',(req, res) => {
    res.json(db.leituras);
});
app.post('/leituras',(req, res, next) => {
    if (req.headers.token){
        next()
    }else
        res.sendStatus(404);
})
app.post('/leituras',(req, res) => {
    const leitura = {
        id: db.leituras.length + 1,
        date: req.body.date,
        value: req.body.value
    }
    db.leituras.push(leitura);
    res.json(leitura);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})


function _2doDevs(){

}
welcome

function welcome(){
    console.log('Bem vindo ao 2doDevs');
}