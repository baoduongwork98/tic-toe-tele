const express = require('express')
const cors = require('cors')
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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})