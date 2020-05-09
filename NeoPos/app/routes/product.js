var express = require('express');
var router = express.Router();


/* GET product detail page. Home (product.ejs) */
router.get('/:id', function(req, res, next) {
    res.render('product', { title: 'Detalle del Producto' });
});

/* GET product add page. Home (index.html) */
router.get('/add', function(req, res, next) {
    res.render('productAdd', { title: 'Creacion del Producto' });
});

module.exports = router;