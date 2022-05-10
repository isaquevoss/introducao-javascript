const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db');
const sequelize = require('./sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');


class Professor extends Model { }


var Aluno = null;

const app = express();

app.use(bodyParser.json());


app.get('/alunos', async (req, res) => {

    const alunos = await Aluno.findAll();
    res.json(alunos)
})
app.get('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    res.json(aluno)
})
app.post('/alunos', async (req, res) => {
    const aluno = new Aluno();
    aluno.nome = req.body.nome;
    aluno.dataNascimento = req.body.dataNascimento;
    aluno.idade = req.body.idade;
    aluno.turma = req.body.turma;

    await aluno.save();
    res.json(aluno);
})

app.put('/alunos/:id', async (req, res) => {
    const aluno = await Aluno.findByPk(req.params.id);
    aluno.nome = req.body.nome;
    // aluno.dataNascimento = req.body.dataNascimento;
    // aluno.idade = req.body.idade;
    // aluno.turma = req.body.turma;
    await aluno.save();
    res.json(aluno);
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
    alunoRepository.update(aluno);
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

    professor.save();
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
    conexao = sequelize.connectSequelize();
    await conexao.authenticate();


    registrarModels();

    Aluno = conexao.define('aluno', {
        nome: {
            type: Sequelize.STRING,
        },
        turma: {
            type: Sequelize.STRING,
        },
        dataNascimento: {
            type: Sequelize.DATE,
        },
        idade: {
            type: Sequelize.INTEGER,
        }

    });
    Professor.init({        
        nome: {
            type: DataTypes.STRING,
        },
        turma: {
            type: DataTypes.STRING,
        },
        dataNascimento: {
            type: DataTypes.DATE,
        },
        escolaridade: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: 'professores',
        // Other model options go here
        sequelize: conexao, // We need to pass the connection instance
        modelName: 'professor' // We need to choose the model name
    });

    const professor = new Professor();
    professor.nome = 'teste';
    professor.save();

    app.listen(3000, () => {//inicia a aplicação
        console.log('Server is running on port 3000');
    })
}

start();