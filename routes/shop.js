var express = require('express');
var router = express.Router();
let shopController = require("../controller/shopController");
let shopMiddlewares= require('../middlewares/shopMiddlewares');

router.get('/',shopController.index);

module.exports = router;