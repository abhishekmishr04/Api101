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

const host = '0.0.0.0';
const preferredPort = Number(process.env.PORT) || 3000;

const startServer = (port) => {
  const server = app.listen(port, host, () => {
    console.log(`Server running on port ${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE' && port === preferredPort) {
      const fallbackPort = preferredPort + 1;
      console.log(`Port ${preferredPort} is busy. Trying ${fallbackPort} instead.`);
      startServer(fallbackPort);
    } else {
      console.error(error);
      process.exit(1);
    }
  });
};

startServer(preferredPort);