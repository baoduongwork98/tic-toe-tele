<template>
    <div id="app">
      <TicTacToe />
    </div>
  </template>
  
  <script setup>
  import TicTacToe from './components/TicTacToe.vue'
  import { onMounted } from 'vue'

  onMounted(() => {
    const tg = window.Telegram.WebApp
    tg.expand() // Mở rộng giao diện

    // Bạn có thể lấy user info
    console.log('Telegram User:', tg.initDataUnsafe.user)

    // Tùy chọn: đổi màu, nút...
    tg.MainButton.setText("Bắt đầu ván chơi")
    tg.MainButton.show()
  })
  </script>
  
  <style>
  #app {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  