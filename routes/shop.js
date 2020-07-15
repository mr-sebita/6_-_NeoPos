var express = require('express');
var router = express.Router();
let shopController = require("../controller/shopController");

router.get('/', shopController.indexdb);

module.exports = router;