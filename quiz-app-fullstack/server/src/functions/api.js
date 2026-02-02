import serverless from 'serverless-http';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import sessionsRouter from '../routes/sessions.js';
import leaderboardRouter from '../routes/leaderboard.js';
import topicsRouter from '../routes/topics.js';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/sessions', sessionsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/topics', topicsRouter);

app.get('/api', (req, res) => {
  res.send('Quiz App Backend is running on Netlify!');
});

export const handler = serverless(app);
