var express                  = require('express');
var router                   = express.Router();
let productController        = require("../controller/productController");
const multer                 = require('multer');
let path                     = require( 'path' );
/*
* Middlewares
*/
var guestMiddlewares         = require( '../middlewares/guestMiddlewares' );
let administratorMiddlewares = require( '../middlewares/administratorMiddlewares' );


var storage = multer.diskStorage(
  {
      destination: function (req, file, cb) {
              cb(null, 'public/images/products')
      },
      filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
}
);
 
var upload = multer({ storage: storage });


/*
*
* Product Creation routes
* @param {route} route
* @param {controller} controller method for that route
*
*/
router.get( '/create' , guestMiddlewares , administratorMiddlewares , productController.newProduct);
router.post('/create',upload.any() ,productController.createProduct);

router.get('/:id', productController.detaildb);
router.post('/delete/:id', administratorMiddlewares , productController.delete);

router.get('/edit/:id' , guestMiddlewares , administratorMiddlewares , productController.detailEdit );
router.post('/edit/:id', upload.any() ,productController.edit); 


module.exports = router;


