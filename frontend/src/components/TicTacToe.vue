
<template>
  <div class="game">
    <h1>Tic Tac Toe</h1>
    <div v-if="!gameId">
      <button @click="createGame">Tạo game</button>
      <input v-model="joinGameId" placeholder="Nhập mã game để tham gia" />
      <button @click="joinGame">Tham gia</button>
    </div>
    <div v-else>
      <p>Game ID: {{ gameId }}</p>
      <div class="board">
        <div
          v-for="(cell, index) in board"
          :key="index"
          class="cell"
          @click="makeMove(index)"
        >
          {{ cell }}
        </div>
      </div>
      <p v-if="winner">Người thắng: {{ winner }}</p>
      <p v-else>Lượt của: {{ isMyTurn ? 'Bạn' : 'Đối thủ' }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, watch} from 'vue'
const api = 'https://tic-toe-tele.onrender.com'

const playerId = window?.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || Math.random().toString(36).substr(2, 6)
const board = ref(Array(9).fill(''))
const gameId = ref('')
const currentPlayer = ref('')
const winner = ref('')
const joinGameId = ref('')
let pollInterval = null

const isMyTurn = computed(() => currentPlayer.value === playerId)
const props = defineProps({
  startPolling: {
    type: Boolean,
    default: false
  }
})
async function createGame() {
  const res = await fetch(api + '/game/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerId })
  })
  const data = await res.json()
  gameId.value = data.id
  board.value = data.board
  currentPlayer.value = data.currentPlayer
  startPolling()
}

async function joinGame() {
  const res = await fetch(api + '/game/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId: joinGameId.value, playerId })
  })
  const data = await res.json()
  gameId.value = data.id
  board.value = data.board
  currentPlayer.value = data.currentPlayer
  startPolling()
}

async function makeMove(index) {
  if (!isMyTurn.value || board.value[index] !== '') return
  const res = await fetch(api + '/game/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ gameId: gameId.value, playerId, index })
  })
  const data = await res.json()
  updateGame(data)
}

function updateGame(data) {
  board.value = data.board
  currentPlayer.value = data.currentPlayer
  winner.value = data.winner
}

function startPolling() {
  clearInterval(pollInterval)
  pollInterval = setInterval(async () => {
    const res = await fetch(api + '/game/' + gameId.value)
    const data = await res.json()
    updateGame(data)
  }, 1000)
}

onMounted(() => {
  if (!playerId) alert("Không lấy được user ID từ Telegram")
})

watch(() => props.startPolling, (newVal) => {
  if (newVal) {
    startPolling()
  } else {
    clearInterval(pollInterval)
  }
})
</script>

<style scoped>
.game {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 5px;
  margin-top: 20px;
}
.cell {
  width: 100px;
  height: 100px;
  background: #f0f0f0;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
