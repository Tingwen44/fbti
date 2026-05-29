require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const eventsRouter = require('./routes/events');
const statsRouter  = require('./routes/stats');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', eventsRouter);
app.use('/api/stats', statsRouter);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`FBTI running on http://localhost:${PORT}`);
});
