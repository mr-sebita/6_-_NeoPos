var express = require('express');
var router = express.Router();
let inicio= require('../controller/indexControllers');
let clientMiddlewares= require('../middlewares/clientMiddlewares');
const indexController = require('../controller/indexControllers');
/* GET home page. Home (index.html) */
router.get('/',clientMiddlewares, indexController.index);

module.exports = router;