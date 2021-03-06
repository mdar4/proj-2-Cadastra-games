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

// Functions
const getGameValidate = () => games.filter(Boolean);

const getGamesById = (id) => {
    getGameValidate().find((game) => {
        game.id == id;
    });
}

const getIndexByGame = (id) => {
    getGameValidate().find((game) => game.id == id);
}
// -----------------------------------------------------------------------


// GET - Rota principal
app.get("/", (req, res) => {
  res.send("Bem vindos !");
});

// GET - Rota com a lista de jogos
app.get("/games", (req, res) => {
  res.send(getGameValidate());
});

// GET - Rota que busca pelo id
app.get("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const game = getGamesById(id);

  if (!game) {
    res.send("Este jogo não está cadastrado.");
  }

  res.send(game);
});

// POST - Método para cadastrar um novo jogo com
app.post("/games", (req, res) => {
  const game = req.body;

  if(!game || !game.nome || !game.ano) {
      res.status(400).send({
          message: "Jogo inválido, tente novamente !"
      });
      return;
  }

  const lastGame = games[games.length - 1];

  if(games.length) {
      game.id = lastGame.id + 1;
      games.push(game);
  
  } else {
      game.id = 1;
      games.push(game);
  }

//   const id = games.length;
  
  res.send(`Novo jogo adicionado com sucesso: ${game}.
    ID do jogo: ${id}`);
});

// PUT - Método para atualizar items
app.put("/games/:id", (req, res) => {
  const id = req.params.id - 1;
  const gameIndex = getIndexByGame(id);

  if (gameIndex < 0) {
    res.status(400).send({
        message: "Jogo não encontrado, tente."
    });
    return;
  }

  const newGame = req.body;

  if(!Object.keys(newGame).length) {
      res.status(400).send({
          message: "O body está vazio."
      });
      return;
  }

  if(!newGame || !newGame.nome ||!newGame.ano) {
      res.status(400).send({
          message: "Jogo inválido, tente novamente."
      });
      return;
  }

  const game = getGamesById(id);

  console.log(gameIndex);
  games[gameIndex] = {
      ... game,
      ... newGame,
  }
  res.send(games[gameIndex]);
});

// DELETE - Método para excluir itens
app.delete("/games/:id", (req, res) => {
  const id = req.params.id - 1;
  const gameIndex = getIndexByGame(id);

  if (gameIndex < 0) {
    res.status(400).send({
        message: "Jogo não encontrado."
    });
    return;
  }

  games.splice(gameIndex, 1);
  res.send({
      message: "Jogo foi removido com sucesso."
  });
});

// Comando para a escuta da porta
app.listen(port, () => {
  console.log(`Games está rodando em: http://localhost:${port}`);
});
