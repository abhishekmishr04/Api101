const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});

app.get('/api/business-data', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM business_data'
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Database error'
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});