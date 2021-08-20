const express = require('express');
const app = express();

const port = 3001;
app.use(express.json());

const games = [
    'God of War',
    'Guittar Hero',
    'GTA',
    'Need for Speed',
    'Crash Budcut',
    'League of Legends',
    'The Sims',
    'Dinasty War'
];

// GET - Rota principal
app.get('/', (req, res) => {
    res.send('Bem vindos !')
});

// GET - Rota com a lista de jogos
app.get('/games', (req, res) => {
    res.send(games);
})

// GET - Rota que busca pelo id
app.get('/games/:id', (req, res) => {
    const id = req.params.id -1;
    const game = games[id];

    if(!game) {
        res.send('Este jogo não está cadastrado.')
    }

    res.send(game);
})

// POST - Método para cadastrar um novo jogo com
app.post('/games', (req, res) => {
    const game = req.body.game;
    const id = games.length;
    games.push(game);

    res.send(`Novo jogo adicionado com sucesso: ${game}.
    ID do jogo: ${id}`);
})

// PUT - Método para atualizar items
app.put('/games/:id', (req, res) => {
    const id = req.params.id -1;
    const game = games[id];

    if(!game) {
        res.send('Jogo não foi encontrado.')
    }
    res.send(game);
})

// DELETE - Método para excluir itens
app.delete('/games/:id', (req, res) => {
    const id = req.params.id -1;
    const game = games[id];

    if(!game) {
        res.send('Jogo não está cadastrado.')
    }
    delete games[id];
    res.send(`${game} foi escluído com sucesso.`)
})


// Comando para a escuta da porta
app.listen(port, () => {
    console.log(`Games está rodando em: http://localhost:${port}`);
})
