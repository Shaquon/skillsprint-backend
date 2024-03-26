const axios = require('axios');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_BASE_URL = 'https://api.openai.com/v1';

const openaiClient = axios.create({
  baseURL: OPENAI_API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

async function generateResponse(prompt, model = 'gpt-3.5-turbo') {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

module.exports = {
  generateResponse,
};