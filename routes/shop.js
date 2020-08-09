var express                  = require('express');
var router                   = express.Router();
let shopController           = require("../controller/shopController");
const multer                 = require('multer');
let path                     = require( 'path' );
let administratorMiddlewares = require( '../middlewares/administratorMiddlewares');
let guestMiddlewares         = require( '../middlewares/guestMiddlewares');

let storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
                cb(null, 'public/images/logos')
        },
        filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
  }
  );
   
let upload = multer({ storage: storage });


router.get('/edit' , administratorMiddlewares ,shopController.createShop );
router.post('/edit' , upload.any() , shopController.saveShop );

router.get('/:id',shopController.shopdb);

module.exports = router;
