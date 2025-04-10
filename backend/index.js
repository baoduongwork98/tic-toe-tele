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
  const botToken ='7058534961:AAFE-3pM4vHFCG6NMnddLB2evMIPVWaHNuY'
  // call api to set webhook
  ///https://api.telegram.org/bot${botToken}/setWebhook?url={urlbackend}/webhook
  if (message && message.text) {
    const chatId = message.chat.id;
    const userMessage = message.text;
    if (message?.text === '/start') {
      const from = message.from;
      const firstName = from.first_name;
      const lastName = from.last_name;
      const welcomeMessage =
          `👋 Xin chào, ${firstName} ${lastName}!\n\n` +
          'Chào mừng bạn đến với Mini App của chúng tôi 🎉\n' +
          'Tại đây bạn có thể:\n\n' +
          '✅ Nhận tích điểm\n' +
          'Mỗi khi bạn mua 1 túi hoặc một chén Cháo tươi TH true FOOD bạn sẽ có thể tích điểm thông qua QR trên hoá đơn\n\n' +
          '✅ Chơi game nhận quà\n' +
          'Giải trí với các mini game hấp dẫn, vừa chơi vừa có cơ hội nhận quà liền tay 🎁\n\n' +
          '✅ Chọn địa chỉ nhận quà\n' +
          'Chọn địa chỉ nhận hàng tiện lợi để chúng tôi gửi quà đến tận tay bạn 📦\n\n' +
          '👉 Nhấn nút bên dưới để bắt đầu ngay nhé!';
      const chatId = message.chat.id;

      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        photo:'https://drive.google.com/file/d/1iuEGEkAvVqf97mA_Ie3otJjnniZLqfsG/view?usp=drive_link',
        text: welcomeMessage,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🚀Bắt đầu",
                web_app: {
                  url: 'https://memory-pokemon-game-duongnb.netlify.app'
                }
              }
            ]
          ],
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