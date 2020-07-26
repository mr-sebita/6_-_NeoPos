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
                        usuarioALoguearse = user[0].name;
                        console.log(usuarioALoguearse);

                    } else {
                        let errors = ['El usuario no existe!'];
                        res.render('index', { user: errors });
                    }
                    req.session.user = usuarioALoguearse;
                    let userLogin = req.session.user;
                    console.log(req.session.user);
                    res.redirect('/');
                })
        } else {
            res.render('index', { user: errorsResult.errors })
        }
    },
    createUser: (req, res) => { //creación del usuario!
        let errors = validationResult(req);
        console.log(validationResult(req));
        if (errors.isEmpty()) { //Si el valor es true, significa que no hay errores!
            let user = {
                id: req.body.id,
                name: req.body.name,
                surname: req.body.surname,
                phone: req.body.phone,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
            addUser(user);
            res.render('index', { userData: req.session.user });
        } else {
            res.render('index', { errors: errors.errors });
        }
    },
    newadmin: (req, res) => {
        res.render('useradmin')
    },
}

module.exports = user;




// <% if (userData != undefined) { %>
//     <img alt="team" class="flex-shrink-0 rounded-lg w-8 h-8 object-cover object-center sm:mb-0 mb-4 " src="/images/mauri.png ">
//    <p><%= userData.name %></p> 
//         <% } else { %> 
// <%  } %>





















            // let usuarioLogueado;
            // let users = readJson();
            // for (let i = 0; i < users.length; i++) {
            //     if (users[i].email == req.body.email) {
            //         if (bcrypt.compareSync(req.body.password, users[i].password)) {
            //             var usuarioALoguearse = users[i];
            //             req.session.usuarioLogueado = usuarioALoguearse;
            //              usuarioLogueado= req.session.usuarioLogueado;
            //             break;
            //         }
            //     }
            // }
            // if (usuarioALoguearse == undefined) {
            //     let errorMessage = ['El Usuario no Existe'];
            //     res.render('index', { userData: errorMessage })
            // }
            // console.log('El usuario logueado es : ' +  usuarioLogueado.name);
            // res.render('index', { user: usuarioLogueado });