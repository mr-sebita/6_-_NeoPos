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

let productController = {
    detaildb: (req, res, next) => {
        db.Product.findByPk(req.params.id)
            .then(function (resultados) {
                if (resultados != undefined) {
                    res.render('product', { data: resultados,user: req.session.user, admin: req.session.admin });
                } else {
                    res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
                }
            });
    },
    newProduct: (req, res, next) => {
        res.render('productNew', { title: 'Creacion del Producto' });
    },
    createProduct: (req, res) => {
        console.log("creando producto");
        db.Product.create({
            img: req.body.img,
            price: req.body.price.trim(),
            title: req.body.title.trim(),
            brand: req.body.brand.trim(),
            description: req.body.description.trim(),
            categoria: req.body.categoria.trim()
        });
        res.redirect('shop');
        //comentarios
        // let product = {
        //     id: req.body.id,
        //     price: req.body.price,
        //     brand: req.body.brand,
        //     title: req.body.title,
        //     discount: req.body.discount,
        //     priceWithDiscount: this.price - (this.price / this.discount),
        //     description: req.body.description,
        // }
        // let searchById = searchById(product.id);
        // if (searchById == null) {
        //     addProduct(product);
        //     return res.send('bien!');
        // } else {
        //     return res.send('Producto ya existente');
        // }
    },
    detailEdit: (req, res) => {
        // if (req.session.usuarioLogueado == undefined) {
        //     res.send('NO ESTAS LOGUEADO');
        // } else {
        //     res.send(req.session.usuarioLogueado)
        // }
        //let product = searchById(req.params.id); //conocemos el producto a editar
        //console.log(product);

        // console.log('El usuario logueado es : ' + req.session.usuarioLogueado.name);
        //if (product != null) {
        //        res.render('productEdit', { data: product });
        //} else
        //    res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
        db.Product.findByPk(req.params.id)
            .then(function (productoEditar) {
                if (productoEditar != undefined) {
                    res.render('productEdit', { data: productoEditar, user: req.session.user, admin: req.session.admin });
                } else {
                    res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
                }
            });
    },
    edit: ( req , res , next ) => {
            console.log('HOLA');
            console.log(req.files[0]);
        db.Product.update({
            // img         : req.files[0].filename,
            price       : req.body.price.trim(),
            title       : req.body.title.trim(),
            //brand: req.body.brand.trim(),
            description : req.body.description.trim(),
            categoria   : req.body.categoria.trim()
        },
            {
                /*  NO TE OLVIDES DE PONER EL WHERE EN EL UPDATE !!!!!*/
                where: {
                    idproducts: req.params.id
                }
            }).then(function(){
                    res.redirect('/shop');
            })
           // .success(function () {
           //     console.log("Project updated successfully!");
           // }).error(function (err) {
           //     console.log("Project update failed !");
           //     //handle error here
           // });
        // let product = searchById(req.params.id); //conocemos el producto a editar
        // let products = readJson(); // traemos el json de productos, parseado con la función
        // console.log(product);

        // if (product != null) {
        //     if (req.body.title.trim() !== '' ||
        //         req.body.description.trim() !== '') {
        //         product.title = req.body.title; //se modifica el campo
        //         product.description = req.body.description;
        //         product.price = req.body.price;
        //         products.map((prod) => {
        //             if (prod.id == product.id) {
        //                 prod.title = product.title;
        //                 prod.description = product.description;
        //                 prod.price = product.price;
        //             }
        //         });
        //         saveJson(products);
        //         return res.send('GENIAL!')
        //     } else {
        //         res.send('no podemos modificarlo')
        //     }
        // } else {
        //     return res.send('No existe')
        // }
    },
    delete: (req, res) => {
        let product = searchById(req.params.id);
        let products = readJson();
        let nuevoArray = [];

        nuevoArray = products.filter(prod => prod.id != product.id);
        saveJson(nuevoArray);
        res.send('Borrado!!')
    }
}

module.exports = productController;


