const express = require('express');
const cors = require('cors');
const supabase = require('./supabase');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// 🔐 Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ message: 'Login gagal' });
  }

  res.json(data);
});

// 📈 Get performance
app.get('/api/performance/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from('performance')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { ascending: true });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// 📝 Get reports
app.get('/api/reports/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('user_id', user_id)
    .order('date', { descending: true });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// 🚀 Run server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
