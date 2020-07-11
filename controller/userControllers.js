const fs = require('fs');
const path = require('path');
let bcrypt = require('bcrypt');
let { check, validationResult, body } = require('express-validator');

// FUNCIONES 


// Leer JSON
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
// Escribir en el JSON
function saveJson(users) {
     return fs.writeFileSync(user.archivo, JSON.stringify(users, null, ' '))
}
// Guardar un usuario
function addUser(user) {
     let users = readJson();

     users.push(user);
     saveJson(users);

}
// Buscar por id
function searchByEmail(email) {
     let users = readJson();
     console.log(email);

     let user = users.filter(u => {

          u.email === email
          console.log(u.email);

     });
     console.log(user[0]);

     if (typeof user != "undefined" &&
          user != null &&
          user.length != null &&
          user.length > 0) {
          return user[0]
     }
}

// Controlador
let user = {
     archivo: path.join(__dirname, '/../models/' + 'user.json'),
     // -----------------------------------------------------------------------------------------------------------
     new: (req, res) => {
          res.render('user')
     },
     login: (req, res) => {

          res.render('login');
     },
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
                    return res.render('login', {
                         errors: [
                              { msg: 'No estas registrado todavía!' }
                         ]
                    });
               }

               req.session.usuarioLogueado = usuarioALoguearse;

               res.send('Ingresaste');

          } else {
               res.render('login', { errors: errors.errors })
          }


     },
     // -----------------------------------------------------------------------------------------------------------
     createUser: (req, res) => { //creación del usuario!

          let errors = validationResult(req);

          console.log(validationResult(req));


          if (errors.isEmpty()) {    //Si el valor es true, significa que no hay errores!

               let user = {
                    id: req.body.id,
                    name: req.body.name,
                    surname: req.body.surname,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10)
               }
               addUser(user);
               res.redirect('login');
               // } else {
               //      return res.send('Cliente ya existente');
               // }
          } else {
               res.render('user', { errors: errors.errors });
          }
     },
     // -----------------------------------------------------------------------------------------------------------
     newadmin: (req, res) => {
          res.render('useradmin')
     },
}

module.exports = user;