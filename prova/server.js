const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

const db = {
    alunos: [{
        id: 1,
        nome: 'João',
        turma: 'Jovem programador',
        dataNascimento: '01/01/2000',
        idade: '22'
    }],
    professores: [{
        id: 1,
        nome: 'Maria',
        turma: 'Jovem programador',
        dataNascimento: '01/01/2000',
        escolaridade: 'superior'
    }],
}

app.get('/alunos', (req, res) => {
    res.json(db.alunos)
})

app.get('/professores', (req, res) => {
    res.json(db.professores)
})

app.get('/alunos/:id', (req, res) => {
    const aluno = db.alunos.find(aluno => aluno.id == req.params.id)
    res.json(aluno)
})

app.get('/professores/:id', (req, res) => {
    const professor = db.professores.find(professor => professor.id == req.params.id)
    res.json(professor)
})

app.post('/alunos', (req, res) => {
    const aluno = {
        id: db.alunos.length + 1,
        nome: req.body.nome,
        turma: req.body.turma,
        dataNascimento: req.body.dataNascimento,
        idade: req.body.idade
    }
    db.alunos.push(aluno)
    res.json(aluno);
})

app.post('/professores', (req, res) => {
    const professor = {
        id: db.professores.length + 1,
        nome: req.body.nome,
        turma: req.body.turma,
        dataNascimento: req.body.dataNascimento,
        escolaridade: req.body.escolaridade
    }
    db.professores.push(professor)
    res.json(professor);
})

app.put('/alunos/:id',(req,res) => {
    const aluno = db.alunos.find(aluno => aluno.id == req.params.id)
    aluno.nome = req.body.nome
    aluno.turma = req.body.turma
    aluno.dataNascimento = req.body.dataNascimento
    aluno.idade = req.body.idade
    res.json(aluno);
})
app.put('/professores/:id',(req,res) => {
    const professor  = db.professores.find(professor => professor.id == req.params.id)
    professor.nome = req.body.nome
    professor.turma = req.body.turma
    professor.dataNascimento = req.body.dataNascimento
    professor.escolaridade = req.body.escolaridade
    res.json(professor);
})

app.patch('/alunos/:id',(req,res) => {
    const aluno = db.alunos.find(aluno => aluno.id == req.params.id)
    if(req.body.nome) 
        aluno.nome = req.body.nome
    if(req.body.turma) 
        aluno.turma = req.body.turma
    if(req.body.dataNascimento) 
        aluno.dataNascimento = req.body.dataNascimento
    if(req.body.idade) 
        aluno.idade = req.body.idade
    res.json(aluno);
})

app.patch('/professores/:id',(req,res) => {
    const professor = db.professores.find(professor => professor.id == req.params.id)
    if(req.body.nome) 
        professor.nome = req.body.nome
    if(req.body.turma) 
        professor.turma = req.body.turma
    if(req.body.dataNascimento) 
        professor.dataNascimento = req.body.dataNascimento
    if(req.body.escolaridade) 
        professor.escolaridade = req.body.escolaridade
    res.json(professor);
})

app.delete('/alunos/:id', (req,res) => {
    db.alunos = db.alunos.filter(aluno => aluno.id != req.params.id)
    res.json({
        message: 'Aluno removido com sucesso'
    })
});

app.delete('/professores/:id', (req,res) => {
    db.professores = db.professores.filter(professor => professor.id != req.params.id)
    res.json({
        message: 'Professor removido com sucesso'
    })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})