const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const linkRoutes = require('./routes/link.routes');
const { handleRedirect } = require('./controllers/link.controller');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());

app.get('/healthz', (req, res) => {
  res.status(200).json({ ok: true, version: '1.0' });
});

app.use('/api', linkRoutes);

app.get('/:code', handleRedirect);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));