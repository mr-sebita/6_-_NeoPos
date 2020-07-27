const fs = require('fs');
const path = require('path');
const db = require('../database/models');
let sequelize = db.sequelize;

function readJson() {
    return JSON.parse(fs.readFileSync(productController.archivo, 'utf-8'));
}
function saveJson(productos) {
    fs.writeFileSync(productController.archivo, JSON.stringify(productos, null, ' '));
}
function addProduct(producto) {
    let productos = readJson();
    productos.push(producto);
    saveJson(productos);
}
function searchById(id) {
    let archivoJson = readJson();
    //console.log(req.params.id);
    let productById = archivoJson.filter(product => product.id === id);
    console.log(productById[0]);

    if (typeof productById != "undefined" &&
        productById != null &&
        productById.length != null &&
        productById.length > 0) {
        return productById[0]
    }
}

let productController = {
    archivo: path.join(__dirname, '/../models/' + 'product.json'),
    detail: (req, res, next) => {
        let productById = searchById(req.params.id);
        if (productById != null) {
            res.render('product', { data: productById });
        } else {
            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
        }
    },
    newProduct: (req, res, next) => {
        res.render('productNew', { title: 'Creacion del Producto' });
    },
    createProduct: (req, res) => {
        let product = {
            id: req.body.id,
            price: req.body.price,
            brand: req.body.brand,
            title: req.body.title,
            discount: req.body.discount,
            priceWithDiscount: this.price - (this.price / this.discount),
            description: req.body.description,
        }
        let searchById = searchById(product.id);
        if (searchById == null) {
            addProduct(product);
            return res.send('bien!');
        } else {
            return res.send('Producto ya existente');
        }
    },
    detailEdit: (req, res) => {
        // if (req.session.usuarioLogueado == undefined) {
        //     res.send('NO ESTAS LOGUEADO');
        // } else {
        //     res.send(req.session.usuarioLogueado)
        // }
        let product = searchById(req.params.id); //conocemos el producto a editar
        console.log(product);

        console.log('El usuario logueado es : ' + req.session.usuarioLogueado.name);

        if (product != null) {
            res.render('productEdit', { data: product });
        } else
            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });

    },
    edit: (req, res) => {
        let product = searchById(req.params.id); //conocemos el producto a editar
        let products = readJson(); // traemos el json de productos, parseado con la función
        console.log(product);

        if (product != null) {
            if (req.body.title.trim() !== '' ||
                req.body.description.trim() !== '') {
                product.title = req.body.title; //se modifica el campo
                product.description = req.body.description;
                product.price = req.body.price;
                products.map((prod) => {
                    if (prod.id == product.id) {
                        prod.title = product.title;
                        prod.description = product.description;
                        prod.price = product.price;
                    }
                });
                saveJson(products);
                return res.send('GENIAL!')
            } else {
                res.send('no podemos modificarlo')
            }
        } else {
            return res.send('No existe')
        }
    },
    delete: (req, res) => {
        let product = searchById(req.params.id);
        let products = readJson();
        let nuevoArray = [];

        nuevoArray = products.filter(prod => prod.id != product.id);
        saveJson(nuevoArray);
        res.send('Borrado!!')
    },
    detaildb: (req, res, next) => {

        //let productById = searchById(req.params.id);
        //if (productById != null) {
        //db.Auto.findByPk(productById)
        //   .then(function(resultados){
        //use data
        //      let datosquery = resultados;
        //                res.send(datosquery);
        //     res.render('product', { data: datosquery });
        //  })
        db.Auto.findByPk(req.params.id)
            .then(function (resultados) {
                if (resultados != undefined) {
                    res.send(resultados);
                } else {
                    res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
                }
            });
        }
}

module.exports = productController;


