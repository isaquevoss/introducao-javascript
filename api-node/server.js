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

app.get('/', (req, res) => res.send('Hello World!'))

const a = function (req, res) {
    res.send('Hello World!');
}

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


app.get('/nome_da_roda/:parametro', (req, res) => { });
app.post('/nome_da_roda/:parametro', (req, res) => { });
app.put('/nome_da_roda/:parametro', (req, res) => { });
app.patch('/nome_da_roda/:parametro', (req, res) => { });
app.delete('/nome_da_roda/:parametro', (req, res) => { });


res.download()	//Solicita que seja efetuado o download de um arquivo
res.end()	//Termina o processo de resposta.
res.json()	//Envia uma resposta JSON.
res.jsonp()	//Envia uma resposta JSON com suporta ao JSONP.
res.redirect()	//Redireciona uma solicitação.
res.render()	//Renderiza um modelo de visualização.
res.send()	//Envia uma resposta de vários tipos.
res.sendFile	//Envia um arquivo como um fluxo de octeto.
res.sendStatus()	//Configura o código do status de resposta e envia a sua representação em sequência de caracteres como o corpo de resposta.

//regular function
function soma(a, b) {
    return a + b;
}
//arrow function
const soma = (a, b) => {
    return a + b;
}

var frutas = ['Maçã', 'Banana'];

var people = [{ name: 'João', age: 20 }, { name: 'Maria', age: 25 }];

var players = [{ name: 'player1', position: { x: 15, y: 15 } }, { name: 'player2', position: { x: 20, y: 20 } }];



app.get('', (res, req) => res.send('Hello World!'))

function soma(a, b) {
    return a + b
}


(a,b) => a+b

var post1 = {
    likes: 0
}


function like(post){
    post.likes++
}

like(post1)