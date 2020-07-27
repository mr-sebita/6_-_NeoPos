var express = require('express');
var router = express.Router();
let shopController = require("../controller/shopController");

// <<<<<<< HEAD
// router.get('/',shopController.index);
router.get('/',shopController.shopdb);

module.exports = router;