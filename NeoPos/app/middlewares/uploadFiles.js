const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null, '/public/images/products')
     },
     filename: function (req, file, cb) {
          let fechaActual = new Date();
          cb(null, req.body.nombre + ' ' + req.body.apellido + ' - ' + fechaActual.getDate() + "-" + fechaActual.getMonth() + "-" + fechaActual.getFullYear() + " " + fechaActual.getHours() + "_" + fechaActual.getMinutes() + "_" + fechaActual.getSeconds() + path.extname(file.originalname));
     }
})
var upload = multer({
     storage: storage,
     fileFilter: (req, file, callback) => {
          let ext = path.extname(file.originalname);
          if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
               return callback(new Error('La imágen del producto solo puede ser JPG, PNG, JPEG'))
          }
          callback(null, true)
     }
}).single('products')


let uploadFile = {
     uploadFile: (req, res, next) => {
          upload(req, res, (err) => {
               // sube el archivo
               if (err) { return res.send('Error') }
               else { next(); }
          })
     }
}

module.exports= uploadFile;