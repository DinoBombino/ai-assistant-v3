module.exports = (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    n8nUrl: process.env.N8N_WEBHOOK_URL ? 'Configured' : 'Not set'
  });
};