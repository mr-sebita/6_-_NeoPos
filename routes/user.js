var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
//const productController = require('../controller/productController');
let { check, validationResult, body } = require('express-validator');
//let guestMiddlewares = require('../middlewares/guestMiddlewares');
//let clientMiddlewares = require('../middlewares/clientMiddlewares');
//let fs = require('fs');
//let path = require('path');
//let db = require( '../database/models' );

router.get( '/login' , userController.login);
router.post('/login',
 [
    check('email').isEmail().withMessage('Falta el email!'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
    
 ], userController.processLogin);

 router.get( '/register' , userController.user);
router.post('/new', [
    check('name'),
    check('surname'),
    check('email').isEmail().withMessage('Ingrese un email válido para poder registrarse'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
    // body('email').custom((value) => {
    //         db.Usuario.findAll({
    //             where: {
    //                 email: value,
    //             }
    //         })
    //         .then(usuario => {
    //             return true;
    //         })
    //     // let usersJson = fs.readFileSync(path.join(__dirname, '/../models/' + 'user.json'), { encoding: 'utf-8' });
    //     // let users;
    //     // if (usersJson == ' ') {
    //     //     users = [];
    //     // } else {
    //     //     users = JSON.parse(usersJson);
    //     // }
    //     // for (let i = 0; i < users.length; i++) {
    //     //     if (users[i].email == value) {
    //     //         return false;
    //     //     }
    //     //     return true;
    //     // }
    // }).withMessage('EL USUARIO YA EXISTE')
], userController.createUser);

router.get( '/registerAdmin' , userController.registerAdmin);
router.post('/newadmin',[
    check('name'),
    check('surname'),
    check('email').isEmail().withMessage('Falta el email!'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener como mínimo 8 caracteres'),
], userController.newadmin);



router.post('/logout', ( req , res ) => {
    req.session.destroy();
    res.redirect('/');
})

router.get('/check', (req, res) => {
    if (req.session.user == undefined) {
        res.send('NO ESTAS LOGUEADO');
    } else {
        res.send(req.session.user)
    }
},);

module.exports = router;