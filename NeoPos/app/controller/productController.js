const fs = require('fs');
const path = require('path');

// Funciones privadas (que sólo las puedo acceder desde este mismo archivo)
function readJson(filename) {
    let archivoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../models/' + filename + '.json'), 'utf-8'));
    return archivoJson;
}
// Funciones publicas
let productController = {
    detail: function(req, res, next) {
        let archivoJson = readJson('product');
        //console.log(req.params.id);
        let productById = archivoJson.products.filter(product => product.id === req.params.id);
        console.log(productById[0]);

        if (typeof productById != "undefined" &&
            productById != null &&
            productById.length != null &&
            productById.length > 0) {
            res.render('product', { data: productById[0] });
        } else

            res.render('productNotExist', { data: req.protocol + '://' + req.get('host') + req.originalUrl });
    },
    new: function(req, res, next) {
        res.render('productNew');
    },

}

module.exports = productController;