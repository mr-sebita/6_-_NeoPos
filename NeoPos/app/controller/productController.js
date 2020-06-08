const fs = require('fs');
const path = require('path');

// Funciones privadas (que sólo las puedo acceder desde este mismo archivo)
//LEE EL JSON
function readJson(filename) {
    return JSON.parse(fs.readFileSync(productController.archivo, 'utf-8'));
}
//GUARDA UN OBJETO EN EL JSON
function saveJson(productos) {
    fs.writeFileSync(productController.archivo, JSON.stringify(productos, null, ' '));
}
//GUARDAR UN PRODUCTO
function addProduct(producto) {
    let productos = readJson();
    productos.push(producto);
    saveJson(productos);
}
//BUSCAR POR ID
// Busca un producto por su id
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
// Funciones publicas
let productController = {
    archivo: path.join(__dirname, '/../models/' + 'product.json'),
    // ------------------------------------------------------------------------------------------------------------
    detail: function (req, res, next) {
        let archivoJson = readJson();

        let productById = searchById(req.params.id);
        // console.log(productById);
        if (productById != null) {
            res.render('product', { data: productById });
        } else

            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
    },
    // ------------------------------------------------------------------------------------------------------------
    createProduct: (req, res) => {

        let product = {
            //"img": "../images/iphone.jpg",
            id: req.body.id,
            price: req.body.price,
            brand: req.body.brand,
            title: req.body.title,
            discount: req.body.discount,
            priceWithDiscount: this.price - (this.price / this.discount),
            description: req.body.description,
        }

        let searchById = searchById(product.id);
        let productos = readJson();

        if (searchById == null) {
            addProduct(product);
            return res.send('bien!');
        } else {
            return res.send('Producto ya existente');
        }
    },
    // ------------------------------------------------------------------------------------------------------------
    detailEdit: (req, res) => {

        let product = searchById(req.params.id); //conocemos el producto a editar
        console.log(product);

        if (product != null) {
            res.render('productEdit', { data: product });
        } else
            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });

    },
    // ------------------------------------------------------------------------------------------------------------
    edit: (req, res) => {


        let product = searchById(req.params.id); //conocemos el producto a editar

        let products = readJson(); // traemos el json de productos, parseado con la función
        console.log(product);

        console.log(products);


        if (product != null) {
            if (req.body.title.trim() !== '' ||
                req.body.description.trim() !== '') {
                product.title = req.body.title; //se modifica el campo
                product.description = req.body.description;

                products.map((prod) => {
                    if (prod.id == product.id) {
                        prod.title = product.title;
                        prod.description = product.description;
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
    // ------------------------------------------------------------------------------------------------------------
    delete: (req, res) => {
        let product = searchById(req.params.id);
        let products = readJson();
        let nuevoArray=[];
        

        nuevoArray= products.filter( prod => prod.id != product.id );
        saveJson(nuevoArray);
        res.send('Borrado!!')
    }
}

module.exports = productController;


