var express = require('express');
var router = express.Router();
let shopController = require("../controller/shopController");

/* GET product detail page. Home (product.ejs) */
router.get('/', shopController.index);

module.exports = router;