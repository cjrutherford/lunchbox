const router = require('express').Router();

const handlers = require('./routeActions');

module.exports = () => {
  router.post('/:userId', handlers.Address.addToUser);
  return router;
};
