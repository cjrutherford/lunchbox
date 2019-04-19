const router = require('express').Router();

const { Address } = require('./routeActions');

router.post('/', Address.addToUser);
router.delete('/:addressId', Address.delete);
module.exports = router;
