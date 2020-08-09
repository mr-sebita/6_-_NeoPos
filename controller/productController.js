/**
* Controlador de productos
* @private
*
*/

/**
 * Modules
 */

const fs = require('fs');
const path = require('path');
const db = require('../database/models');

/**
 * Producto Controller
 * 
 * @detail
 * @productnew
 * 
 */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const formatPrice = (price, discount) => {
    let priceDot;
    if (discount == undefined) {
        priceDot = toThousand(price.toFixed(2));
    } else {
        priceDot = toThousand((price * (1 - (discount / 100))).toFixed(2));
    }
    let first = priceDot.slice(0, -3);
    let last = priceDot.slice(-3);
    let lastReplaced = last.replace(".", ",");
    return `$ ${first}${lastReplaced}`;
};

let productController = {
    detaildb: async (req, res, next) => {
        let product = await db.Product.findByPk(req.params.id)
        if ( product != undefined ) {
            res.render('product', { formatPrice, data: product, user: req.session.user, admin: req.session.admin });
        } else {
            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
        }
    },
    newProduct: (req, res, next) => {
        res.render('productNew', { title: 'Creacion del Producto', user: req.session.user, admin: req.session.admin });
    },
    createProduct: async (req, res, next) => {
        let product = await db.Product.create({
            img: '/images/products/' +  req.files[0].filename,
            price: req.body.price,
            title: req.body.title,
            stock: req.body.stock,
            description: req.body.description,
            shop_idshop: req.session.user.shop_idshop
        });
        let products = await db.Product.findAll({
            where: {
                shop_idshop: req.session.user.shop_idshop
            },
            include: [{
                association: "shopProduct",
            }]
        })
        console.log(products);
        res.render('profileAdmin', { user: req.session.user, data: products });
    },
    detailEdit: async (req, res) => {
        let productoEditar = await db.Product.findByPk(req.params.id)

        if (productoEditar != undefined) {
            res.render('productEdit', { data: productoEditar, user: req.session.user, admin: req.session.admin });
        } else {
            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
        }

    },
    edit: async (req, res, next) => {
        let editProduct = await db.Product.update({
            img: '/images/products/' + req.files[0].filename,
            price: req.body.price.trim(),
            title: req.body.title,
            description: req.body.description,
            stock: req.body.stock.trim(),
            shop_idshop: req.session.user.shop_idshop
        }, {
            /*  NO TE OLVIDES DE PONER EL WHERE EN EL UPDATE !!!!!*/
            where: {
                idproducts: req.params.id
            }
        })
        res.redirect('/');
    },
    delete: async ( req , res ) => {

       await db.Product.destroy({
            where: {
                idproducts: req.params.id
            }
        })
        res.redirect('/');
    }
}

module.exports = productController;


