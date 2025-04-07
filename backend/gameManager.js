const games = {}

function createGame(playerId) {
  const gameId = generateId()
  games[gameId] = {
    id: gameId,
    board: Array(9).fill(''),
    players: [playerId],
    currentPlayer: playerId,
    winner: null
  }
  return games[gameId]
}

function joinGame(gameId, playerId) {
  const game = games[gameId]
  if (game && game.players.length === 1 && !game.players.includes(playerId)) {
    game.players.push(playerId)
    return game
  }
  return null
}

function makeMove(gameId, playerId, index) {
  const game = games[gameId]
  if (!game || game.winner || game.board[index] !== '' || game.currentPlayer !== playerId) return null

  const symbol = game.players[0] === playerId ? 'X' : 'O'
  game.board[index] = symbol

  if (checkWinner(game.board, symbol)) {
    game.winner = symbol
  } else {
    const nextPlayer = game.players.find(p => p !== playerId)
    game.currentPlayer = nextPlayer
  }

  return game
}

function getGame(gameId) {
  return games[gameId]
}

function generateId() {
  return Math.random().toString(36).substr(2, 6)
}

function checkWinner(board, symbol) {
  const win = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  return win.some(([a,b,c]) => board[a] === symbol && board[b] === symbol && board[c] === symbol)
}

module.exports = { createGame, joinGame, makeMove, getGame }