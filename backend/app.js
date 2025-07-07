const express = require('express');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend port (Vite)
    credentials: true,               // allow sending cookies
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome');
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server Is Listening On Port http://localhost:${PORT}`)
} )