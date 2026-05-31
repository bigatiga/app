const express = require('express');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.env.APP_VERSION || '1.0.0' });
});

app.get('/api/greet', (req, res) => {
  const raw = req.query.name;

  if (raw !== undefined && (typeof raw !== 'string' || raw.trim().length === 0)) {
    return res.status(400).json({ error: 'Invalid name' });
  }

  const name = (raw && raw.trim()) || 'World';
  res.json({ message: `Hello, ${name}!` });
});

module.exports = app;
