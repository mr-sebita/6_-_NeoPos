function shopMiddlewares(req, res, next) {
    if (req.session.user !== undefined) {
        res.render('shop', { user : req.session.user.name });
    } else {
        next();
    }
}

module.exports = shopMiddlewares;