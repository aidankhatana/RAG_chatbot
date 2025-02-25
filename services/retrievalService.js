const db = require('../firebase');
const { generateEmbedding } = require('./embeddingService');

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const normB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (normA * normB);
}

async function retrieveRelevantDoc(businessId, userQuery) {
  try {
    const queryEmbedding = await generateEmbedding(userQuery);
    
    const docsSnapshot = await db.collection('businesses')
      .doc(businessId)
      .collection('documents')
      .get();

    let bestMatch = null;
    let highestSimilarity = -1;

    docsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.embedding) {
        const similarity = cosineSimilarity(queryEmbedding, data.embedding);
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity;
          bestMatch = data;
        }
      }
    });

    return bestMatch;
  } catch (error) {
    console.error('Error retrieving relevant doc:', error);
    throw error;
  }
}

module.exports = { retrieveRelevantDoc }; 