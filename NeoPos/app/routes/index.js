var express = require('express');
var router = express.Router();

/* GET home page. Home (index.html) */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Neo Pos Software' });
});

module.exports = router;