const express = require('express')
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/turmas/:idturma/alunos/:idaluno', (req, res) => {
    res.send('Retornando aluno: ' + req.params.idaluno + ' da  turma '+req.params.idturma)
})


app.listen('3000', () => {
    console.log('server started on port 3000')
})