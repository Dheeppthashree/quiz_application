const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load Routes
// We will lazy-load or require them directly
const sessionsRouter = require('./routes/sessions');
const leaderboardRouter = require('./routes/leaderboard');
const topicsRouter = require('./routes/topics');

app.use('/api/sessions', sessionsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/topics', topicsRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
