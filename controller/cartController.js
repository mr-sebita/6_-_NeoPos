const db = require('../database/models');

function verify( lista , title ){   
    console.log('ENTREEEEEE!!!!!!!!!!!!');       //verifica si el producto esta en el carrito
        let positionProduct= -1;                // lista => carrito ---- idproducts=> producto a agregar     
        for( let i ; i< lista.length; i++){  
            console.log(lista[i].idproducts);   //positionProduct => posicion del producto en el carrito
            if ( lista[i].title == title ) {
                console.log('ESTE ES EL ID SEGUN LA POSICION ' + lista[i].idproducts );
                positionProduct = i;
                break;
            }
        }
        return positionProduct;                         
}

let cart = {
    init: (req, res, next) => {
        
        console.log(req.session.usuarioLogueado);
        res.render('cart', { title: 'Neo Pos carrito',user: req.session.user });
    },
    addPProduct: ( req , res , next ) => {
        let cart     = req.session.cart;
        let idproducts  = req.params.id;
        db.Product.findByPk( idproducts )
        .then( ( product ) => {
            if( product ){
                let positionProduct = verify( cart , product.title );
                    if( positionProduct === -1 ){
                        let productInCart = {
                            idproducts  : product.idproducts,
                            title       : product.title,
                            description : product.description,
                            quantity    : 1,
                            price       : product.price,
                            priceTotal  : product.price,
                            img         : product.img
                        }
                        console.log( productInCart );
                        cart.push( productInCart );
                        console.log(cart);
                    }else{
                        let productInCart = cart[ positionProduct ];
                        productInCart.quantity   = productInCart.quantity + 1;
                        productInCart.priceTotal = productInCart.price * productInCart.quantity;
                        cart[ positionProduct ]  = productInCart;
                    }
            }
            res.render('cart' , { data: product , user: req.session.user });
        });

        
    }
}

module.exports = cart;