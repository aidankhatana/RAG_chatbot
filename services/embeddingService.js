const { LLama } = require('node-llama-cpp');
const path = require('path');
const config = require('../config');

// Initialize Llama model for embeddings
const llama = new LLama({
  modelPath: config.llama.embeddingModelPath,
  embedding: true,
  nCtx: 2048,
  nThreads: 4
});

async function generateEmbedding(text) {
  try {
    // Use Llama to generate embeddings
    const embedding = await llama.embed(text);
    return embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

module.exports = { generateEmbedding }; 