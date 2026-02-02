const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
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

module.exports = router;
