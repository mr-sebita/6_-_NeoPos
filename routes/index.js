var express = require('express');
var router = express.Router();
let inicio= require('../controller/indexControllers');
let clientMiddlewares= require('../middlewares/clientMiddlewares');
/* GET home page. Home (index.html) */
router.get('/',clientMiddlewares, inicio.index);

module.exports = router;