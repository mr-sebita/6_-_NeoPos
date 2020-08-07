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

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price,discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price*(1-(discount/100))).toFixed(2));
    }
    let first = priceDot.slice(0,-3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$ ${first}${lastReplaced}`;
};

/**
 * shopController
 * 
 * @shopdb get
 * 
 */
let shopController = {
    shopdb: async (req, res) => {
        let datosquery = await db.Product.findAll({
                where: {
                    shop_idshop: req.params.id
                },
                include: [{
                    association: "shopProduct",
                }]
            })
        res.render('shop', { formatPrice , data: datosquery ,user: req.session.user });
    }
};

module.exports = shopController;