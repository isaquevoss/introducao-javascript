
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