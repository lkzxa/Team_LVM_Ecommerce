// File: server.js
const dotenv = require('dotenv');
// 1. CHẠY DOTENV LÊN ĐẦU TIÊN
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');

// 2. KẾT NỐI DB
connectDB();

// --- 3. (BƯỚC QUAN TRỌNG NHẤT) PRE-LOAD TẤT CẢ MODEL ---
// (PHẢI NẰM Ở ĐÂY)
require('./models/User');
require('./models/Cart');
require('./models/Wishlist');
require('./models/Product');
require('./models/Notification');
// ----------------------------------------------------

// 4. KHỞI TẠO EXPRESS APP
const app = express();

// 5. CẤU HÌNH MIDDLEWARE
app.use(express.json());

// 6. GẮN (MOUNT) CÁC ROUTE
// (PHẢI NẰM SAU KHI PRE-LOAD MODEL)
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/carts', require('./routes/cartRoutes'));
app.use('/api/v1/wishlists', require('./routes/wishlistRoutes'));

// 7. ROUTE KIỂM TRA CƠ BẢN
app.get('/', (req, res) => {
  res.send('API is running ...');
});

// 8. LẤY CỔNG VÀ LẮNG NGHE
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});