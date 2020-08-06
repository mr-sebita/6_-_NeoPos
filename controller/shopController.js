/**
 * 
 * Controlador de rutas del Shop
 * 
 */

/**
 * Modules
 */
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

/**
 * shopController
 * 
 * @shopdb get
 * 
 */
let shopController = {
    shopdb: (req, res) => {
        db.Product.findAll({
                where: {
                    shop_idshop: req.params.id
                }
            }
        )
        .then((datosquery) => {
                console.log('before render');
                res.render('shop', { data: datosquery, shop: datosquery[0].shopProduct.shop_banner   ,user: req.session.user });
            });
    }
};

module.exports = shopController;