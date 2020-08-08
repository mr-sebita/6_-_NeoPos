var express = require('express');
var router = express.Router();
let shopController = require("../controller/shopController");

router.get('/:id',shopController.shopdb);

router.get('/create' , shopController.createShop );
router.post('/create' , shopController.saveShop );

module.exports = router;
