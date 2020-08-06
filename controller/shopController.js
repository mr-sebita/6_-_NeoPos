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
            //include: [{
              //  association: "userShop",
                where: {
                    shop_idshop: req.session.user.idusuario
                }
            }//]
        //}
        )
            .then((datosquery) => {
                console.log('before render');
                res.render('shop', { data: datosquery, user: req.session.user });
            });
    }
};

module.exports = shopController;