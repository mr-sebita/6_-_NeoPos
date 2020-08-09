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
    },
    createShop: (req, res) => {
        res.render('createShop');
    },
    saveShop: async ( req , res , next ) => {
        let shop= await db.shop.create({
            idshop: req.session.user.idusuario,
            shop_name: req.body.shopName,
            shop_logo: req.files[0].filename,
            shop_banner: req.files[1].filename
        })
        //  console.log(req.session.user.idusuario);
        res.redirect( '/' );
    }
};

module.exports = shopController;