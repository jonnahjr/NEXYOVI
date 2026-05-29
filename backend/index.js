const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock database for waitlist
const waitlist = [];

app.get('/', (req, res) => {
  res.send('Huly Clone API is running');
});

app.post('/api/waitlist', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });
  
  waitlist.push({ email, date: new Date() });
  console.log(`New sign-up: ${email}`);
  
  res.status(201).json({ message: 'Welcome to the waitlist!', total: waitlist.length });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
