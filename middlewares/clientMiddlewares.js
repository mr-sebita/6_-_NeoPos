function clientMiddlewares(req, res, next) {
    if (req.session.user !== undefined) {
        res.render('index', { userData : req.session.user });
    } else {
        next();
    }
}

module.exports = clientMiddlewares;