var express = require('express');
var router = express.Router();


/* GET product detail page. Home (product.ejs) */
router.get('/detalle/:id', function(req, res, next) {
    res.render('product', { title: 'Detalle del Producto' });
});

/* GET product add page. Home (productAdd.ejs) */
router.get('/add', function(req, res, next) {
    res.render('productAdd', { title: 'Creacion del Producto' });
});

module.exports = router;