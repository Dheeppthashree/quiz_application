import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      take: 10,
      orderBy: { totalScore: 'desc' },
      include: { user: true }
    });

    const leaderboard = sessions.map((s, index) => ({
      rank: index + 1,
      name: s.user.name,
      score: s.totalScore,
      percentage: Math.round((s.totalScore / s.totalQuestions) * 100)
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
