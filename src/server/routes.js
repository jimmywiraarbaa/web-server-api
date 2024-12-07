const handlers = require('../server/handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: handlers.postPredict,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: handlers.getPredictions,
  },
];

module.exports = routes;
