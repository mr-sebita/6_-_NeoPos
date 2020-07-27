const fs   = require('fs');
const path = require('path');
const db   = require('../database/models');

function readJson(filename) {
    let archivoJson = JSON.parse(fs.readFileSync(path.join(__dirname, '/../models/' + filename + '.json'), 'utf-8'));
    return archivoJson;
}

let shopController = {
    index: function(req, res, next) {
        let archivoJson = readJson('product');
        // console.log(req.session.user);
        res.render('shop', { data: archivoJson, user:req.session.user });
    },
    indexdb: (req, res ) => {
        db.Product.findAll()
        .then(function(datosquery){
         res.render('shop', { data: datosquery });
        //});
       // sequelize.query("SELECT * FROM products")
       //     .then(function(resultados){
       //         //use data
       //         let datosquery = resultados[0];
//     //           res.send(datosquery);
       //         res.render('shop', { data: datosquery });
        });
    }
};

module.exports = shopController;