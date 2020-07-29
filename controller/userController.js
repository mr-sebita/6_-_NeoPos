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
    processLogin: (req, res) => {
        console.log('processlogin');
        //1 . validation in fields
        //2 . validation in password field
        //3 . send messages
        let errorsResult = validationResult(req);
        if (errorsResult.isEmpty()) {
            let usuarioALoguearse;
            db.Usuario.findAll({
                where: {
                    email: req.body.email,
                }
            }).then(userResultado => {
                console.log(userResultado);
                //if (bcrypt.compareSync(req.body.password, userResultado.dataValues.password)) {
                //    console.log("EL USUARIO ES : "+ userResultado.dataValues.name );
                //    req.session.user = userResultado.dataValues.password;
                //    console.log(req.session.user);
                //   // res.redirect('/');
                //    res.render('index', { userData: req.session.user });
                //} 
                console.log("EL USUARIO ES : " + userResultado[0].dataValues.name);
                req.session.user = userResultado[0].dataValues;
                console.log(req.session.user);
                res.redirect('/shop');

            })
                .catch(() => {
                    let errors = ['El usuario no existe!'];
                    res.render('index', { errors: errors });
                })
        } else {
            res.render('index', { errors: errorsResult.errors })
        }
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
                avatar: 'https://robohash.org/88.55.33.66', //create in the future a fetch
                carrito_idcarrito: '3'
            }).then((userCreado) => {
                console.log("EL USUARIO ES : " + userCreado.name);
                //res.send(userCreado);
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