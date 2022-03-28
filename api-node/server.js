const express = require('express');
const bodyparser = require('body-parser')

const app = express();
app.use(bodyparser.json());

var alunos = [{
    id: 1,
    nome: 'João',
    sobrenome: 'Silva',
    dataNascimento: '01/01/2000',
},
{
    id: 2,
    nome: 'Maria',
    sobrenome: 'Silva',
    dataNascimento: '01/01/2000',
}];

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/alunos', (req, res) => {
    res.json(alunos);
})

app.get('/alunos/:id', (req, res) => {
    const id = req.params.id
    const aluno = alunos.find(element => element.id == id)
    res.json(aluno);
})

app.delete('/alunos/:id', (req, res) => {
    const id = req.params.id
    const aluno = alunos.find(element => element.id == id)
    alunos.splice(alunos.indexOf(aluno), 1);
    res.send('Aluno removido com sucesso!');
})

app.post('/alunos', (req, res) => {
    alunos.push(req.body.nome);
    res.json(alunos);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})
//rodar 
//npm init
// npm install express
// npm install body-parser