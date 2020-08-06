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
                },
                include: [{
                    association: "shopProduct",
                }]
            }
        )
        .then((datosquery) => {
                console.log(datosquery);
                res.render('shop', { data: datosquery ,user: req.session.user });
            });
    }
};

module.exports = shopController;