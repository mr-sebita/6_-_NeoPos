const fs = require('fs');
const path = require('path');

// Funciones privadas (que sólo las puedo acceder desde este mismo archivo)
function readJson(filename) {
    let archivoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../models/' + filename + '.json'), 'utf-8'));
    return archivoJson;
}
// Funciones publicas
let shopController = {
    index: function(req, res, next) {
        let archivoJson = readJson('product');
        console.log(archivoJson);

        res.render('shop', { data: archivoJson });
    }
}
module.exports = shopController;