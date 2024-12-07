const { Firestore } = require('@google-cloud/firestore');

const getAllData = async () => {
  const db = new Firestore();
  const predictCollection = db.collection('predictions');

  try {
    const snapshot = await predictCollection.get();

    const predictions = snapshot.docs.map((doc) => {
      const data = doc.data();
      const id = doc.id;

      return {
        id: id,
        history: {
          result: data.result,
          createdAt: data.createdAt,
          suggestion: data.suggestion,
          id: id,
        },
      };
    });

    return predictions;
  } catch (error) {
    console.error('Error getting documents:', error);
    throw new Error('Gagal mengambil data dari Firestore');
  }
};

module.exports = getAllData;
