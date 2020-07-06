var express = require('express');
var router = express.Router();
let inicio= require('../controller/indexControllers');
// let clientLogin= require( '../middlewares/clientLogin' );

/* GET home page. Home (index.html) */
router.get('/' ,inicio.index);

module.exports = router;