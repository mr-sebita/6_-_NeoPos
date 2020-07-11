var user = require('../controller/userController');

function clientMiddlewares(req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        res.render('login');
    } else {
        next();
    }
}

module.exports = clientMiddlewares;