<template>
    <div id="app">
      <TicTacToe v-model:startPolling="isStart"/>
    </div>
  </template>
  
  <script setup>
  import TicTacToe from './components/TicTacToe.vue'
  import {onMounted, ref} from 'vue'
  const isStart = ref(false)
  const startPolling = () => {
    // Polling logic here
    isStart.value = !isStart.value
  }
  onMounted(() => {
    const tg = window.Telegram.WebApp
    tg.expand() // Mở rộng giao diện

    // Bạn có thể lấy user info
    console.log('Telegram User:', tg.initDataUnsafe.user)

    // Tùy chọn: đổi màu, nút...
    // tg.MainButton.setText("Bắt đầu ván chơi")
    // tg.MainButton.show()
    tg.MainButton.hide()
    // tg.onEvent(',mainButtonClicked', () => {
    //   startPolling()
    //   tg.MainButton.hide()
    // })
  })
  </script>
  
  <style>
  #app {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  