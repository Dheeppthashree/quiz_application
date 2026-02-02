const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Session
router.post('/', async (req, res) => {
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
        topicIds: JSON.stringify(topicIds), // Store as JSON string
        totalScore: 0,
        totalQuestions: 5, // Fixed for now
      }
    });

    res.json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Answer
router.post('/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
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

    res.json({ isCorrect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
