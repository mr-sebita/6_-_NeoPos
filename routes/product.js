var express = require('express');
var router = express.Router();
let productController = require("../controller/productController");
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



router.get('/create' , productController.newProduct);
router.post('/create',upload.any() ,productController.createProduct);

router.get('/:id', productController.detail);

router.get('/edit/:id' ,productController.detailEdit);
router.put('/edit/:id', upload.any() ,productController.edit); 

router.delete('/:id', productController.delete);

module.exports = router;


