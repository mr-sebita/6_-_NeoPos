let cart = {
    init: (req, res, next) => {
        res.render('cart', { title: 'Neo Pos carrito' });
    }
}

module.exports = cart;