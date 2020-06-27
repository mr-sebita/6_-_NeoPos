var express = require('express');
var router = express.Router();

/* GET cart page. Home (cart.ejs) */
router.get('/', function(req, res, next) {
    res.render('cart', { title: 'Neo Pos cart' });
});

module.exports = router;