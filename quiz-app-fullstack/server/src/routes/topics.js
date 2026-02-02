const express = require('express');
const router = express.Router();

// Hardcoded topics for simplicity (or moved from client)
// Ideally, we fetch from a shared data source
const topics = [
  { id: 't1', title: 'Targeting', icon: '🎯' },
  { id: 't2', title: 'Bidding', icon: '💰' },
  { id: 't3', title: 'Ad Formats', icon: '🖼️' },
  { id: 't4', title: 'Analytics', icon: '📊' },
  { id: 't5', title: 'Privacy', icon: '🔒' }
];

router.get('/', (req, res) => {
  res.json(topics);
});

module.exports = router;
