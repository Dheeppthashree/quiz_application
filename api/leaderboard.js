import prisma from './lib/prisma.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
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

      return res.status(200).json(leaderboard);
    } catch (error) {
      console.error('Leaderboard error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
