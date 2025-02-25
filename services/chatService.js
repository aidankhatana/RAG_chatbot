const { LlamaModel, LlamaChatSession } = require('llama-node');
const { retrieveRelevantDoc } = require('./retrievalService');
const path = require('path');
const config = require('../config');

// Initialize Llama model for chat
const model = new LlamaModel({
  modelPath: config.llama.chatModelPath,
  contextSize: 4096,
  batchSize: 512
});

async function getChatResponse(businessId, userMessage) {
  try {
    const relevantDoc = await retrieveRelevantDoc(businessId, userMessage);
    
    const session = new LlamaChatSession(model);
    
    const systemPrompt = `You are a helpful assistant for a restaurant. 
    Answer queries based on the provided restaurant information. 
    If the answer cannot be found in the provided context, politely say you don't have that information.`;

    const context = `
    Context: ${relevantDoc ? relevantDoc.content : 'No context available'}
    Question: ${userMessage}
    `;

    // Initialize chat with system prompt
    await session.prompt(systemPrompt);
    
    // Get response based on context and user message
    const response = await session.prompt(context);

    return response;
  } catch (error) {
    console.error('Error getting chat response:', error);
    throw error;
  }
}

module.exports = { getChatResponse }; 