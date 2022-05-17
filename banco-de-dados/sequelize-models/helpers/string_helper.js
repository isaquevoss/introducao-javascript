function removeNumeros(texto) {
    var texto = texto.replace(/[0-9]/g, '');
    return texto;
}

function somenteNumeros(texto) {
    var texto = texto.replace(/[^0-9]/g, '');
    return texto;
}

module.exports = { somenteNumeros, removeNumeros };
