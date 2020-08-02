/**
 * 
 * Controlador de rutas del Shop
 * 
 */

/**
 * Modules
 */
const fs   = require('fs');
const path = require('path');
const db   = require('../database/models');

/**
 * shopController
 * 
 * @shopdb get
 * 
 */
let shopController = {
    shopdb: (req, res ) => {
        db.Product.findAll()
        .then((datosquery)=> {
         res.render('shop', { data: datosquery, user: req.session.user});
        });
    }
};

module.exports = shopController;