var express          = require('express');
var router           = express.Router();
const cart           = require('../controller/cartController');
let guestMiddlewares = require( '../middlewares/guestMiddlewares' );

router.get('/', cart.init);

router.post('/:id' , guestMiddlewares , cart.addProduct);

module.exports = router;