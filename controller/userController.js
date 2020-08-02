/**
 * 
 * Controlador de rutas de Usuario
 * 
 */

/**
 * Modulos
 */
const path = require('path');
let bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');
const db = require('../database/models');
const shopCheckAdminMiddleware = require('../middlewares/shopCheckAdminMiddleware');

/**
 * UserController
 * 
 * @login GET
 * @processLogin POST
 * @user  GET
 * @RegisterUser POST
 * @RegisterAdmin POST
 * 
 */
let userController = {
    /* GET */
    user: (req, res) => {
        res.render('user');
    },
    admin: (req, res) => {
        res.render('useradmin');
    },
    getLogin: (req, res) => {
        res.render('login');
    },

    /*  POST */
    login: (req, res) => {
        /*
        *1 . validation on form fields
        *2 . validation on password field
        *3 . send messages to user
        */
        let errorsResult = validationResult(req);
        if (errorsResult.isEmpty()) {
            db.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            }).then(userResult => {
                console.log(userResult);
                if (typeof userResult != 'undefined') {
                    //#TODO crypto verificacion !!
                    // if (bcrypt.compareSync(req.body.password, userResultado.dataValues.password)) {
                    //     req.session.user = userResultado.dataValues.password;
                    //    // res.redirect('/');
                    //     res.render('index', { userData: req.session.user });
                    // } 

                    /* assign user and properties to Session Variable*/
                    req.session.user = userResult.dataValues;
                    let userLogin = req.session.user;
                    
                    if (req.session.user.grupo == 'admin') {
                        let type = 'admin';
                        res.render('shop', { user: userLogin, typeUser: type });
                    } else {
                        let type = 'user';
                        res.redirect('shop',{ user: userLogin, typeUser: type });
                    }
                }
                res.redirect('/');
            });
        } else {
            res.render('index', { errors: errorsResult.errors })
        }
    },
    registerUser: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) { //if true -> no errors
            db.Usuario.create({
                name: req.body.name.trim(),
                surname: req.body.surname.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/' + req.body.name + '?set=set3',
                carrito_idcarrito: '3',
                grupo: 'user'
            }).then((userCreate) => {
                //res.send(userCreate);
                req.session.user = userCreate;
                req.session.admin = false;
                res.redirect('/shop');
            })
                .catch(() => {
                    let errors = ['Error al registrarse!'];
                    res.render('index', { errors: errors });

                })
        } else {
            res.render('index', { errors: errors.errors });
        }
    },
    registerAdmin: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) { //if true -> no errors
            db.Usuario.create({
                name: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/88.55.33.66', //create in the future a fetch
                grupo: 'admin'
            }).then((adminCreate) => {
                req.session.user = adminCreate;
                req.session.admin = true;
                res.redirect('/shop');
            })
                .catch(() => {
                    let errors = ['Error al registrarse!'];
                    res.render('index', { errors: errors });

                })
        } else {
            res.render('index', { errors: errors.errors });
        }
    },
}

module.exports = userController;






// <% if (req.session.user != undefined) { %>
//     <img alt="team" class="flex-shrink-0 rounded-lg w-8 h-8 object-cover object-center sm:mb-0 mb-4 " src="/images/mauri.png ">
//    <p><%= req.session.user %></p> 
//         <% } else { %> 
// <%  } %>