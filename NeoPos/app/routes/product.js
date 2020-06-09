var express = require('express');
var router = express.Router();
let productController = require("../controller/productController");
let uploadFile= require( '../middlewares/uploadFiles' );

/* GET product detail page. Home (product.ejs) */
/* router.get('/detail/:id', function(req, res, next) {
    res.render('product', { title: 'Detalle del Producto' });
}); */

/* GET product detail page. Home (product.ejs) */
router.get('/:id', productController.detail);

router.get('/edit/:id', productController.detailEdit);        //EDITAR UN PRODUCTO, RUTA POR GET
router.put('/edit/:id', productController.edit);                  //EDITAR UN PRODUCTO, RUTA POR PUT
router.delete('/:id', productController.delete);

/* GET product add page. Home (index.html) */
router.get('/create', function(req, res, next) {
    res.render('productNew', { title: 'Creacion del Producto' });
});
router.post('/create', uploadFile.uploadFile ,productController.createProduct);
module.exports = router;


