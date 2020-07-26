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

let user = {
    archivo: path.join(__dirname, '/../models/' + 'user.json'),
    processLogin: (req, res) => {
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
            })
                .then(user => {
                    let usuarioALoguearse;
                    if (bcrypt.compareSync(req.body.password, user[0].password)) {
                        usuarioALoguearse = user[0];
                        console.log(user[0]);

                    } else {
                        let errors = ['El usuario no existe!'];
                        res.render('/', { user: errors });
                    }
                    req.session.user = usuarioALoguearse;
                    let userLogin = req.session.user;
                    console.log(req.session.user);
                    res.render('/', {user : userLogin });
                })
        } else {
            res.render('index', { user: errorsResult.errors })
        }
    },

    // -----------------------------------------------------------------------------------------------
    createUser: (req, res) => { //creación del usuario!
        let errors = validationResult(req);
        console.log(validationResult(req));
        if (errors.isEmpty()) { //Si el valor es true, significa que no hay errores!

            db.Usuario.create({
                    name     : req.body.name,
                    surname  : req.body.surname,
                    phone    : req.body.phone,
                    email    : req.body.email,
                    password : bcrypt.hashSync(req.body.password, 10)
                });
            
            console.log(user);
            
            // addUser(user);
            res.send(user);
            // res.render('index', { userData: req.session.user });
        } else {
            res.render('index', { errors: errors.errors });
        }
    },

    // ---------------------------------------------------------------------------------------------
    newadmin: (req, res) => {
        let errors = validationResult(req);
        console.log(validationResult(req));
        if (errors.isEmpty()) { //Si el valor es true, significa que no hay errores!

            db.Cliente.create({
                    username : req.body.username,
                    cuit     : req.body.cuit,
                    email    : req.body.email,
                    password : bcrypt.hashSync(req.body.password, 10)
                });
            
            console.log(user);
            
            // addUser(user);
            res.send(user);
            // res.render('index', { userData: req.session.user });
        } else {
            res.render('index', { errors: errors.errors });
        }
    },
}

module.exports = user;






// <% if (req.session.user != undefined) { %>
//     <img alt="team" class="flex-shrink-0 rounded-lg w-8 h-8 object-cover object-center sm:mb-0 mb-4 " src="/images/mauri.png ">
//    <p><%= req.session.user %></p> 
//         <% } else { %> 
// <%  } %>