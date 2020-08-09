var express = require('express');
var router = express.Router();
const indexController = require('../controller/indexControllers');



/* GET home page. Home (index.html) */
router.get('/', indexController.index);
router.get('/mall', indexController.mall);

module.exports = router;