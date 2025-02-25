const express = require('express');
const cors = require('cors');
const { getChatResponse } = require('./services/chatService');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const { businessId, message } = req.body;
    
    if (!businessId || !message) {
      return res.status(400).json({ error: 'Missing businessId or message' });
    }

    const response = await getChatResponse(businessId, message);
    res.json({ reply: response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
}); 