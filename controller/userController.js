const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');
const db = require('../database/models');

function readJson(filename) {
    let userLeido = fs.readFileSync(user.archivo, 'utf-8');
    let users;
    if (userLeido == "") {
        users = [];
        return users;
    } else {
        return JSON.parse(userLeido);
    }
}
function saveJson(users) {
    return fs.writeFileSync(user.archivo, JSON.stringify(users, null, ' '))
}

function addUser(user) {
    let users = readJson();
    users.push(user);
    saveJson(users);
}

let userController = {
    archivo: path.join(__dirname, '/../models/' + 'user.json'),
    login: ( req , res ) => {
        res.render( 'login' );
    },
    processLogin: (req, res) => {
        console.log('processlogin');
        //1 . validation in fields
        //2 . validation in password field
        //3 . send messages
        let errorsResult = validationResult(req);
        if (errorsResult.isEmpty()) {
            let usuarioALoguearse;
            //TODO change a USUARIO model!
            db.Cliente.findAll({
                where: {
                    email: req.body.email
                }
            }).then(userResultado => {
                //TODO finish this implementation
                //if (bcrypt.compareSync(req.body.password, userResultado.dataValues.password)) {
                //    console.log("EL USUARIO ES : "+ userResultado.dataValues.name );
                //    req.session.user = userResultado.dataValues.password;
                //    console.log(req.session.user);
                //   // res.redirect('/');
                //    res.render('index', { userData: req.session.user });
                //} 
                if (typeof adminResultado != 'undefined') {
                    req.session.user = adminResultado[0].dataValues;
                }
                //TODO here there's an issue: improve the use of admin flag
                if (req.session.admin == "false" || typeof req.session.admin == 'undefined') {
                    req.session.admin = "true";
                    console.log("se logeo un admin");
                    console.log(req.session.admin);
                    res.redirect('/shop');
                }
            });
            // I NEED TO DO A SECOND QUERY WITH SEQUELIZE
            db.Usuario.findAll({
                where: {
                    email: req.body.email
                }
            }).then(userResultado => {
                if (typeof userResultado != 'undefined') {
                    req.session.user = userResultado[0].dataValues;
                }

                if (req.session.admin == "true" || typeof req.session.admin == 'undefined') {
                    req.session.admin = "false";
                    console.log("se logeo un usuario");
                    res.redirect('/shop');
                }
            })
        } else {
            res.render('index', { errors: errorsResult.errors })
        }
    },
    user: ( req , res ) => {
        
// <!-- <% //if( typeof errors != 'undefined') { %>
// <% //for(error of errors){ %>
//     <ul style="color: red;"> <%= //error.msg %> </ul>
//     <%// } %> 
// <%// } %>  
// <form  action="/user/new" method="POST" class="row"> -->
        res.render( 'user' );
    },
    createUser: (req, res) => {
        let errors = validationResult(req);
        console.log(validationResult(req));
        if (errors.isEmpty()) { //if true -> no errors
            db.Usuario.create({
                name: req.body.name.trim(),
                surname: req.body.surname.trim(),
                email: req.body.email.trim(),
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/' + req.body.name + '?set=set3',
                carrito_idcarrito: '3'
            }).then((userCreado) => {
                console.log("EL USUARIO ES : " + userCreado.name);
                //res.send(userCreado);
                console.log(userCreado.avatar)
                req.session.user = userCreado;
                req.session.admin = false;
                //console.log(req.session.user);
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
    registerAdmin: ( req , res )=> {
            res.render('useradmin');
    },
    newadmin: (req, res) => {
        let errors = validationResult(req);
        console.log(validationResult(req));
        if (errors.isEmpty()) { //if true -> no errors
            db.Cliente.create({
                name: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                avatar: 'https://robohash.org/88.55.33.66', //create in the future a fetch
            }).then((adminCreado) => {
                console.log("EL USUARIO ES : " + adminCreado.name);
                //res.send(adminCreado);
                req.session.user = adminCreado;
                req.session.admin = true;
                //console.log(req.session.user);
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