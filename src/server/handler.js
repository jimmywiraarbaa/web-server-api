const crypto = require('crypto');

const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const getAllData = require('../services/getAllData');

const postPredict = async (request, h) => {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { result, resultScore, suggestion } = await predictClassification(
      model,
      image
    );
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result,
      suggestion,
      createdAt,
    };

    console.log(id, data);

    await storeData(id, data);
    return h
      .response({
        status: 'success',
        message:
          resultScore > 99
            ? 'Model is predicted successfully'
            : 'Model is predicted successfully',
        data,
      })
      .code(201);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'Terjadi kesalahan dalam melakukan prediksi',
      })
      .code(400);
  }
};

const getPredictions = async (request, h) => {
  try {
    const data = await getAllData();

    console.log(data);

    return h
      .response({
        status: 'success',
        data: data,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal mengambil data',
      })
      .code(500);
  }
};

module.exports = {
  postPredict,
  getPredictions,
};
