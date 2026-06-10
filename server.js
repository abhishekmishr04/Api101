const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/api/business-data', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM data1'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Database error'
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});