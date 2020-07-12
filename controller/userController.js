const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');

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
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let users = readJson();
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    //IF PARA VERIFICAR LA CONTRASEÑA
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        var usuarioALoguearse = users[i];
                        break;
                    }
                }
            }
            if (usuarioALoguearse == undefined) {
                let error = ['El Usuario no Existe'];
                res.render('index1', { errors: error })
            }
            req.session.usuarioLogueado = usuarioALoguearse;
            res.render('index1', { userData: req.session.usuarioLogueado });
        } else {
            res.render('index1', { 'errors': errors.errors })
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
            res.render('index1', { userData: req.session.usuarioLogueado });
        } else {
            res.render('index1', { errors: errors.errors });
        }
    },
    newadmin: (req, res) => {
        res.render('useradmin')
    },
}

module.exports = user;