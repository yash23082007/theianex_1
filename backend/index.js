const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projectRoutes');

const app = express();
const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

let databaseStatus = 'connecting';

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origin not allowed by CORS'));
    },
  })
);
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: databaseStatus,
    uptime: Math.round(process.uptime()),
  });
});

app.use('/api/projects', projectRoutes);


mongoose.connection.on('connected', () => {
  databaseStatus = 'connected';
});

mongoose.connection.on('disconnected', () => {
  databaseStatus = 'disconnected';
});

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    databaseStatus = 'disconnected';
    console.log('DB Connection Error:', err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
