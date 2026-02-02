import prisma from '../lib/prisma.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { id } = req.query;
      const { topicId, questionIndex, selectedAnswer, correctAnswer } = req.body;

      const isCorrect = selectedAnswer === correctAnswer;

      // Record Answer
      await prisma.answer.create({
        data: {
          sessionId: id,
          topicId: String(topicId),
          questionIndex,
          selectedAnswer,
          correctAnswer,
          isCorrect
        }
      });

      // Update Score if correct
      if (isCorrect) {
        await prisma.session.update({
          where: { id },
          data: { totalScore: { increment: 1 } }
        });
      }

      return res.status(200).json({ isCorrect });
    } catch (error) {
      console.error('Answer submission error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
