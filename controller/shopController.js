const fs = require('fs');
const path = require('path');
const db = require('../database/models');
let sequelize = db.sequelize;

function readJson(filename) {
    let archivoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../models/' + filename + '.json'), 'utf-8'));
    return archivoJson;
}

let shopController = {
    index: function(req, res, next) {
        let archivoJson = readJson('product');
        res.render('shop', { data: archivoJson });
    },
    indexdb: (req, res) => {
        sequelize.query("SELECT * FROM movies")
            .then(function(resultados) {
                //use data
                let data = resultados[0];
                res.send(data);
            })
    }
}
module.exports = shopController;