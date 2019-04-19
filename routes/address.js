const router = require('express').Router();

const { Address } = require('./routeActions');

router.post('/', Address.addToUser);
module.exports = router;
