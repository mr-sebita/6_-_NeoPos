var express = require('express');
var router = express.Router();
let productController = require("../controller/productController");
let clientMiddlewares = require( '../middlewares/clientMiddlewares' );
const multer  = require('multer');
let path= require( 'path' );


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })
   
  var upload = multer({ storage: storage });

/* GET product detail page. Home (product.ejs) */
/* router.get('/detail/:id', function(req, res, next) {
    res.render('product', { title: 'Detalle del Producto' });
}); */
/* GET product add page. Home (index.html) */
router.get('/create', clientMiddlewares , function(req, res, next) {
    res.render('productNew', { title: 'Creacion del Producto' });
});
router.post('/create', upload.any() , productController.createProduct);

/* GET product detail page. Home (product.ejs) */
router.get('/:id', productController.detail);

router.get('/edit/:id', clientMiddlewares ,productController.detailEdit);        //EDITAR UN PRODUCTO, RUTA POR GET
router.put('/edit/:id', upload.any() , productController.edit);                  //EDITAR UN PRODUCTO, RUTA POR PUT
router.delete('/:id', productController.delete);


module.exports = router;


