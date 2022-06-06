const jwt = require('jsonwebtoken');

const JWT_KEY = 'AJFHASÇDKFJçkj12çlij4p9032jçoaiuf0924u3ghgj9i034rç21r5tnblkjfdkalçsljklfdfgsd~la';

function gerarJwt(payload) {
    return jwt.sign(payload, JWT_KEY, { expiresIn: 10 });
}
function validarJwt(token) {
    return jwt.verify(token, JWT_KEY);
}
function decodificarJwt(token) {
    return jwt.decode(token);
}

module.exports = {
    gerarJwt,
    validarJwt,
    decodificarJwt
}
