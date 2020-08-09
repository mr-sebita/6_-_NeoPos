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
    login: async (req, res) => {
        /*
        *1 . validation on form fields
        *2 . validation on password field
        *3 . send messages to user
        */
        let errorsResult = validationResult(req);
        if (errorsResult.isEmpty()) {
            console.log('Here');
            db.User.findOne({
                where: {
                    email: req.body.email
                },
                include: [{
                    association: "userShop",
                }]
            }
            ).then(userResult => {
                if (bcrypt.compareSync(req.body.password, userResult.dataValues.password)) {

                    req.session.user = userResult;
                    let userLogin = req.session.user;
                    console.log(req.body.recordame);
                    if (req.body.recordame === 'on') {
                        console.log('Hola');
                        res.cookie('recordame', userLogin.dataValues.email, { maxAge: 60000 });
                    }

                    if (req.session.cart == undefined) {
                        req.session.cart = [];
                    }
                    res.redirect('/');

                } else {
                    let errors = [{ msg: 'Contraseña incorrecta' }];
                    res.render('login', { errors: errors });
                }
            })
                .catch(error => {
                    let errors = [{ msg: 'El email no existe' }];
                    res.render('login', { errors: errors })
                })
        } else {
            res.render('login', { errors: errorsResult.errors })
        }
    },
    registerUser: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) { //if true -> no errors
            db.User.create({
                name: req.body.name.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/' + req.body.name + '?set=set3',
                carrito_idcarrito: '3',
                grupo: 'user'
            }).then((userCreate) => {
                console.log(userCreate);
                req.session.user = userCreate;
                req.session.admin = false;
                // res.redirect('/');
                res.render('index', { user: userCreate });
            })
                .catch((catchedErrors) => {
                    res.render('index', { errors: catchedErrors });
                })
        } else {
            res.render('useradmin', { errors: errors.errors });
        }
    },
    registerAdmin: async (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) { //if true -> no errors
            let admin = await db.User.create({
                name: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/' + req.body.name,
                carrito_idcarrito: '4',
                grupo: 'admin',
            })

            let shop = await db.Shop.create({
                idshop: admin.idusuario,
            })

            let relation = await db.User.update(
                {
                    shop_idshop: shop.idshop
                }, {
                where: {
                    idusuario: admin.idusuario
                }
            })
            
            res.redirect('index');
        } else {
            res.render('index', { errors: errors.errors });
        }
    },
    adminDetail: async (req, res, next) => {
        let products = await db.Product.findAll({
            where: {
                shop_idshop: req.params.id
            },
            include: [{
                association: "shopProduct",
            }]
        })
        console.log(products);
        res.render('profileAdmin', { user: req.session.user, data: products });
    },
    userDetail: async (req, res, next) => {
        res.render('profile', { user: req.session.user });
    },
    userEditProfile: (req, res) => {
        console.log(req.params.id);
        res.render('profileEdit', { user: req.session.user });
    },
    userEdit: (req, res, next) => {
        db.User.update(
            {
                name: req.body.name,
            }, {
            where: {
                idusuario: req.params.id,
            }
        })
        db.User.findOne({
            where: {
                idusuario: req.params.id
            }
        })
            .then((user) => {
                req.session.user = user.dataValues;
                console.log(req.session.user);
                res.redirect('/user/detail');
            })
    }
}

module.exports = userController;






// <% if (req.session.user != undefined) { %>
//     <img alt="team" class="flex-shrink-0 rounded-lg w-8 h-8 object-cover object-center sm:mb-0 mb-4 " src="/images/mauri.png ">
//    <p><%= req.session.user %></p> 
//         <% } else { %> 
// <%  } %>


// name: req.body.username,
//                 email: req.body.email,
//                 password: bcrypt.hashSync(req.body.password, 10),
//                 /*
//                 * DEBERIA GENERAR ID DE SHOP PARA CONECTARLO CON SU LUGAR DE COMPRA
//                 */
//                 avatar: 'https://robohash.org/' + req.body.name,
//                 carrito_idcarrito: 'NULL',
//                 shop_idshop: '3',
//                 grupo: 'admin'
//                 //    usershop: {
//                 //        shop_name: 'Tu primer tienda',
//                 //        shop_logo: 'Tu Logo',
//                 //        shop_banner: 'Tu banner'
//                 //    }
//                 //},
//                 //    {
//                 //        include: usershop,
//             }).then((adminCreate) => {
//                 req.session.user = adminCreate;
//                 req.session.admin = true;
//                 res.render('index', { user: adminCreate });
//             }).catch((catchedErrors) => {
//                 res.render('index', { errors: catchedErrors });