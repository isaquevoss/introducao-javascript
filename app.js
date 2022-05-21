const { application } = require("express");

async function testeAssincrono() {
    return 'teste assincrono';
}


async function teste() {

    console.log('testeajdasf');
}

async function testeAssincrono2() {
    const resultado = await testeAssincrono();
    await teste();
    console.log('resultado'+resultado)
}


testeAssincrono2();



app.get('/gerarjwt/:dado', (req, res) => {
    res.send(jwt.sigh(req.params.dado,'asdf'));
});