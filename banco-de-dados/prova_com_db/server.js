const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db');

const app = express();

app.use(bodyParser.json());


app.get('/alunos', async (req, res) => {
    const alunos = await conexao.all('SELECT * FROM alunos');
    res.json(alunos)
})
app.get('/alunos/:id', async (req, res) => {
    const aluno = await conexao.get(`SELECT * FROM 
     alunos WHERE id = :id`, { ':id': req.params.id });
    res.json(aluno)
})
app.post('/alunos', async (req, res) => {
    const retorno = await conexao.run(`insert into alunos 
    (nome, turma, dataNascimento, idade)
    values
    (:nome, :turma, :dataNascimento, :idade)`, {
        ':nome': req.body.nome,
        ':turma': req.body.turma,
        ':dataNascimento': req.body.dataNascimento,
        ':idade': req.body.idade
    });
    const alunoCadastrado = await conexao.get(`select * from 
    alunos where id = :id`, { ':id': retorno.lastID });

    res.json(alunoCadastrado);
})

app.put('/alunos/:id', async (req, res) => {
    const retorno = await conexao.run(`UPDATE alunos SET 
    nome = :nome,
    turma = :turma, 
    dataNascimento = :dataNascimento,
    idade = :idade WHERE id = :id`, {
        ':nome': req.body.nome,
        ':turma': req.body.turma,
        ':dataNascimento': req.body.dataNascimento,
        ':idade': req.body.idade,
        ':id': req.params.id
    });
    const alunoAtualizado = await conexao.get(`select * from
    alunos where id = :id`, { ':id': req.params.id });
    res.json(alunoAtualizado);
})

app.patch('/alunos/:id', async (req, res) => {
    const aluno = await conexao.get(`SELECT * 
    FROM alunos WHERE id = :id`, { ':id': req.params.id });
    if (req.body.nome)
        aluno.nome = req.body.nome;
    if (req.body.turma)
        aluno.turma = req.body.turma;
    if (req.body.dataNascimento)
        aluno.dataNascimento = req.body.dataNascimento;
    if (req.body.idade)
        aluno.idade = req.body.idade;
    await conexao.run(`UPDATE alunos SET  
    nome = :nome,
    turma = :turma,
    dataNascimento = :dataNascimento,
    idade = :idade 
    WHERE id = :id`, {
        ':nome': aluno.nome,
        ':turma': aluno.turma,
        ':dataNascimento': aluno.dataNascimento,
        ':idade': aluno.idade
    })
    res.json(aluno);
})
app.delete('/alunos/:id', async (req, res) => {
    const retorno = await conexao.run(`DELETE FROM alunos 
    WHERE id = :id`, { ':id': req.params.id });    
    res.json({
        message: 'Aluno removido com sucesso'
    })
});



app.get('/professores', (req, res) => {
    res.json(db.professores)
})


app.get('/professores/:id', (req, res) => {
    const professor = db.professores.find(professor => professor.id == req.params.id)
    res.json(professor)
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


app.put('/professores/:id', (req, res) => {
    const professor = db.professores.find(professor => professor.id == req.params.id)
    professor.nome = req.body.nome
    professor.turma = req.body.turma
    professor.dataNascimento = req.body.dataNascimento
    professor.escolaridade = req.body.escolaridade
    res.json(professor);
})



app.patch('/professores/:id', (req, res) => {
    const professor = db.professores.find(professor => professor.id == req.params.id)
    if (req.body.nome)
        professor.nome = req.body.nome
    if (req.body.turma)
        professor.turma = req.body.turma
    if (req.body.dataNascimento)
        professor.dataNascimento = req.body.dataNascimento
    if (req.body.escolaridade)
        professor.escolaridade = req.body.escolaridade
    res.json(professor);
})

app.delete('/alunos/:id', (req, res) => {
    db.alunos = db.alunos.filter(aluno => aluno.id != req.params.id)
    res.json({
        message: 'Aluno removido com sucesso'
    })
});

app.delete('/professores/:id', (req, res) => {
    db.professores = db.professores.filter(professor => professor.id != req.params.id)
    res.json({
        message: 'Professor removido com sucesso'
    })
});

var conexao;

async function start() {
    conexao = await db.connect();//conecta com o banco de dados
    conexao.exec('CREATE TABLE IF NOT exists alunos (id INTEGER PRIMARY KEY, nome TEXT, turma TEXT, dataNascimento TEXT, idade INTEGER)');
    conexao.exec('CREATE TABLE IF NOT exists professores (id INTEGER PRIMARY KEY, nome TEXT, turma TEXT, dataNascimento TEXT, escolaridade TEXT)');
    app.listen(3000, () => {//inicia a aplicação
        console.log('Server is running on port 3000');
    })
}

start();