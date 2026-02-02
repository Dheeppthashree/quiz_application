import prisma from './lib/prisma.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { userName, topicIds } = req.body;
      
      // Find or Create User
      let user = await prisma.user.findFirst({ where: { name: userName } });
      if (!user) {
        user = await prisma.user.create({ data: { name: userName } });
      }

      // Create Session
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          topicIds: JSON.stringify(topicIds),
          totalScore: 0,
          totalQuestions: 5,
        }
      });

      return res.status(200).json(session);
    } catch (error) {
      console.error('Session creation error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
