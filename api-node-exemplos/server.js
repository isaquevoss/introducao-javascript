const express = require('express');
const bodyparser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(bodyparser.json());
app.use(cors())
const db = {
    leituras: []
};
app.get('/leituras',(req, res) => {
    res.json(db.leituras);
});
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