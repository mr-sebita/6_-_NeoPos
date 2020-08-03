const db = require('../database/models');


let cart = {
    init: (req, res, next) => {
        console.log(req.session.usuarioLogueado);
        res.render('cart', { title: 'Neo Pos carrito', user: req.session.user });
    },
    addProduct: (req, res, next) => {
        let cart = req.session.cart;
        db.Product.findByPk(req.params.id)
            .then((productFound) => {
                if (productFound != undefined) {
                    cart.push(productFound);
                }
                res.render('cart', { data: cart, user: req.session.user });
            });
    }
}

module.exports = cart;




