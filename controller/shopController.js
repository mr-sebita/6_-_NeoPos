const fs   = require('fs');
const path = require('path');
const db   = require('../database/models');

function readJson(filename) {
    let archivoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../models/' + filename + '.json'), 'utf-8'));
    return archivoJson;
}

let shopController = {
    shop: function(req, res, next) {
        let archivoJson = readJson('product');
        // console.log(req.session.user);
        res.render('shop', { data: archivoJson, user:req.session.user });
    },
    shopdb: (req, res ) => {
        db.Product.findAll()
        .then(function(datosquery){
         res.render('shop', { data: datosquery, user: req.session.user});
        });
    }
};

module.exports = shopController;