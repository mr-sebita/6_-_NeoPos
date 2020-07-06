var express = require('express');
var router = express.Router();
var user = require('../controller/userControllers');
let { check, validationResult, body } = require('express-validator');
let guestMiddlewares = require( '../middlewares/guestMiddlewares' );
let clientMiddlewares = require( '../middlewares/clientMiddlewares' );
let fs = require('fs');
let path = require( 'path' );




/*------ Creacion de usuario ------*/
router.get('/new',guestMiddlewares ,user.new);
router.post('/new', [
    check('name'),
    //--------------
    check('surname'),
    //--------------
    check('email')
    .isEmail()
    .withMessage('Falta el email!'),
    //--------------
    check('password')
    .isLength({ min: 8 })  
    .withMessage('La contraseña debe tener como mínimo 8 caracteres'),
    //--------------
    body('email').custom((value) => {

        let usersJson = fs.readFileSync(path.join(__dirname, '/../models/' + 'user.json'), { encoding: 'utf-8' });
        let users;
        if (usersJson == ' ') {
            users=[];
        } else {
            users = JSON.parse(usersJson);
        }

        for(let i = 0; i< users.length ; i++){
            if(users[i].email == value){
                return false;
            }
                return true;
        }
    }).withMessage('EL USUARIO YA EXISTE')
],
    user.createUser);

router.get('/newadmin', user.newadmin);
router.post('/newadmin', (req, res) => {
    res.send('llego');
});
/*------ Login -----*/
router.get('/login', user.login);
router.post('/login',[
    check('email')
    .isEmail()
    .withMessage('Falta el email!'),
    //--------------
    check('password')
    .isLength({ min: 8 })  
    .withMessage('La contraseña debe tener como mínimo 8 caracteres'),
    //--------------
    // body('email').custom((value) => {

    //     let usersJson = fs.readFileSync(path.join(__dirname, '/../models/' + 'user.json'), { encoding: 'utf-8' });
    //     let users;
    //     if (usersJson == '') {
    //         users=[];
    //     } else {
    //         users = JSON.parse(usersJson);
    //     }

    //     for(let i = 0; i< users.length ; i++){
    //         if(users[i].email != value){
    //             return false;
    //         }
    //             return true;
    //     }
    // }).withMessage('EL USUARIO NO EXISTE'),
    
] ,user.processLogin);

// router.get('/profile' , user.profile );
module.exports = router;