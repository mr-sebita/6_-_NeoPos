function clientMiddlewares(req, res, next) {
    if (req.session.user !== undefined) {
        res.render('index', { user : req.session.user.name });
    } else {
        next();
    }
}

module.exports = clientMiddlewares;