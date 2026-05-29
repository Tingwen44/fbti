const express = require('express');
const router = express.Router();
const { insertEvent, insertResult } = require('../database/init');

// POST /api/event — record a user event
router.post('/event', (req, res) => {
  try {
    const { session_id, event_type, device_type, referrer } = req.body;
    if (!session_id || !event_type) {
      return res.status(400).json({ error: 'session_id and event_type required' });
    }

    insertEvent({ session_id, event_type, device_type, referrer });
    res.json({ ok: true });
  } catch (err) {
    console.error('Event error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/result — record a completed test result
router.post('/result', (req, res) => {
  try {
    const { session_id, personality, personality_name, scores, time_spent, device_type } = req.body;
    if (!session_id || !personality) {
      return res.status(400).json({ error: 'session_id and personality required' });
    }

    insertResult({ session_id, personality, personality_name, scores, time_spent, device_type });
    res.json({ ok: true });
  } catch (err) {
    console.error('Result error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
