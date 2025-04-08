const express = require('express')
const cors = require('cors')
const axios = require('axios');

const {
  createGame,
  joinGame,
  makeMove,
  getGame
} = require('./gameManager')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/game/create', (req, res) => {
  const { playerId } = req.body
  const game = createGame(playerId)
  res.json(game)
})

app.post('/game/join', (req, res) => {
  const { gameId, playerId } = req.body
  const game = joinGame(gameId, playerId)
  if (game) res.json(game)
  else res.status(400).json({ error: 'Unable to join game' })
})

app.post('/game/move', (req, res) => {
  const { gameId, playerId, index } = req.body
  const game = makeMove(gameId, playerId, index)
  if (game) res.json(game)
  else res.status(400).json({ error: 'Invalid move' })
})

app.get('/game/:gameId', (req, res) => {
  const game = getGame(req.params.gameId)
  if (game) res.json(game)
  else res.status(404).json({ error: 'Game not found' })
})

app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  const botToken ='7613604843:AAE4OML5a8PRHvptJWM9Y7U4Pzi1-FhbTR4'
  if (message && message.text) {
    const chatId = message.chat.id;
    const userMessage = message.text;
    if (message?.text === '/start') {
      const chatId = message.chat.id;

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: '🎮 Chào mừng bạn đến với Tic Tac Toe!',
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀 Mở trò chơi",
                web_app: {
                  url: 'https://tic-toe-tele.netlify.app'
                }
              }
            ]
          ]
        }
      });
    }

  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})