function clientMiddlewares(req, res, next) {
    if (req.session.user == undefined) {
        res.render('/');
    } else {
        next();
    }
}

module.exports = clientMiddlewares;