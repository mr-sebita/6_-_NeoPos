var express = require('express');
var router = express.Router();
let productController = require("../controller/productController");
let clientMiddlewares = require( '../middlewares/clientMiddlewares' );


router.get('/:id', productController.detail);
router.get('/edit/:id', clientMiddlewares ,productController.detailEdit);        
router.get('/create', clientMiddlewares , productController.newProduct);

router.post('/create', productController.createProduct);
router.put('/edit/:id', productController.edit);                  
router.delete('/:id', productController.delete);


module.exports = router;


