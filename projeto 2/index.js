const express = require("express");
const app = express();

const port = 3001;
app.use(express.json());

const games = [
  {   
      id : 1,
      nome: "God of War",
      ano: 2013 // corrigir todos os anos depois
  },
  {
      id: 2,
      nome: "Guittar Hero",
      ano: 2013,
  },
  {
      id: 3,
      nome: "GTA",
      ano: 2010
  },
  {
      id: 4,
      nome:"Need for Speed",
      ano: 2009
  },
 {
     id: 5,
     nome: "Crash Budcut",
     ano: 2010
 },
  {
      id: 6,
      nome: "League of Legends",
      ano: 2012
  },
  {
      id: 7,
      nome: "The Sims",
      ano: 2010
  },
  {
      id: 8,
      nome: "Dinasty War",
      ano: 2012
  },
];

const getGameValidate = () => games.filter(Boolean);

const getGamesById = (id) => {
    getGameValidate().find((game) => {
        game.id == id;
    });
}

const getIndexByGame = (id) => {
    getGameValidate().find((game) => game.id == id);
}

// GET - Rota principal
app.get("/", (req, res) => {
  res.send("Bem vindos !");
});

// GET - Rota com a lista de jogos
app.get("/games", (req, res) => {
  res.send(games);
});

// GET - Rota que busca pelo id
app.get("/games/:id", (req, res) => {
  const id = req.params.id - 1;
  const game = games[id];

  if (!game) {
    res.send("Este jogo não está cadastrado.");
  }

  res.send(game);
});

// POST - Método para cadastrar um novo jogo com
app.post("/games", (req, res) => {
  const game = req.body.game;
  const id = games.length;
  games.push(game);

  res.send(`Novo jogo adicionado com sucesso: ${game}.
    ID do jogo: ${id}`);
});

// PUT - Método para atualizar items
app.put("/games/:id", (req, res) => {
  const id = req.params.id - 1;
  const game = games[id];

  if (!game) {
    res.send("Jogo não foi encontrado.");
  }
  res.send(game);
});

// DELETE - Método para excluir itens
app.delete("/games/:id", (req, res) => {
  const id = req.params.id - 1;
  const game = games[id];

  if (!game) {
    res.send("Jogo não está cadastrado.");
  }
  delete games[id];
  res.send(`${game} foi excluído com sucesso.`);
});

// Comando para a escuta da porta
app.listen(port, () => {
  console.log(`Games está rodando em: http://localhost:${port}`);
});
