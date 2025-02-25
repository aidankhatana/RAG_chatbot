require('dotenv').config();

const config = {
  llama: {
    embeddingModelPath: process.env.LLAMA_EMBEDDING_MODEL_PATH,
    chatModelPath: process.env.LLAMA_CHAT_MODEL_PATH
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  },
  server: {
    port: process.env.PORT || 3000
  }
};

module.exports = config; 