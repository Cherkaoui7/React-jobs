// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const jobRoutes = require('./routes/jobs');


const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Autoriser Vercel + localhost
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
app.use(cors({ origin: [FRONTEND_URL, 'https://react-jobs-blond.vercel.app'] }));

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

app.use('/api/jobs', jobRoutes);
app.use('/api/jobs', jobRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});