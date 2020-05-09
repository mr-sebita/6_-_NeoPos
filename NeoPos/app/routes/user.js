var express = require('express');
var router = express.Router();

/*------ Edicion de usuario ya creado -----*/
router.get('/detail', function(req, res, next) {
    res.send('respond with a resource');
});

/*------ Creacion de usuario ------*/
router.get('/new', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;