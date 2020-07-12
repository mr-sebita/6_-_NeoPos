var express = require('express');
var router = express.Router();
const cart = require('../controller/cartController');

router.get('/', cart.init);

module.exports = router;