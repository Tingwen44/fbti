const express = require('express');
const router = express.Router();
const { getStats, getAllResults } = require('../database/init');

// GET /api/stats/overview
router.get('/overview', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/stats/personalities — full distribution
router.get('/personalities', (req, res) => {
  try {
    const data = getAllResults();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
