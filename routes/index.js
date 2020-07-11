var express = require('express');
var router = express.Router();
let inicio= require('../controller/indexControllers');

/* GET home page. Home (index.html) */
router.get('/', inicio.index);

module.exports = router;