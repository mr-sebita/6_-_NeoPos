var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


/*------ Edicion de usuario ya creado -----*/
router.get('/detail', function(req, res, next) {
    res.send('respond with a resource');
});

/*------ Creacion de usuario ------*/
router.get('/new', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;