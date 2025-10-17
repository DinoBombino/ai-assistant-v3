const axios = require('axios');

// const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'https://n8n.namelomax.beget.tech/webhook/api/chat';
const N8N_WEBHOOK_URL = 'https://n8n.namelomax.beget.tech/webhook/api/chat';


mmodule.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`Processing message: "${message}"`);

    const n8nResponse = await axios.post(N8N_WEBHOOK_URL, {
      message: message.trim()
    }, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });

    const reply = n8nResponse.data?.contents?.[0]?.parts?.[0]?.reply || 'Нет ответа от AI';
    res.json({
      success: true,
      reply: reply,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Chat API error:', error.message);
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({ error: 'AI timeout' });
    }
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'AI service error',
        details: error.response.data
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};