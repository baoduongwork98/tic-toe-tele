
# Tic Tac Toe Telegram App

## 📦 Cấu trúc

- `backend/`: Node.js + Express server để quản lý trạng thái trò chơi
- `frontend/`: Vue.js app cho UI, tương thích Telegram Web App

## 🚀 Chạy app

### 1. Backend

```bash
cd backend
npm install
npm start
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📲 Tích hợp Telegram WebApp

- Dùng Telegram.WebApp.initDataUnsafe.user.id làm `playerId`
- Thêm script Telegram vào `index.html`
- Tích hợp API vào Vue

Chúc bạn chơi vui! 🎮
