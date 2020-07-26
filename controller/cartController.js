let cart = {
    init: (req, res, next) => {
        
        console.log(req.session.usuarioLogueado);
        res.render('cart', { title: 'Neo Pos carrito' });
    }
}

module.exports = cart;