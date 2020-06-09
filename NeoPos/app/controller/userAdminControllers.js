const path = require('path');
const fs = require('fs');

function readJson(filname) {
     console.log(userAdmin.archivo);

     return JSON.parse(fs.readFileSync(userAdmin.archivo, 'utf-8'));
}
function writeJson(users) {
     return fs.writeFileSync(userAdmin.archivo, JSON.stringify(users, 'utf-8'));
}
function addUser(user) {
     let users = readJson();
     users.push(user);
     writeJson(users);
}

function searchByCuit(cuit) {
     let usersAdmin = readJson();
     // console.log(users);

          let user = usersAdmin.find(u => u.cuit == cuit);
          return user;
}

let userAdmin = {
     archivo: path.join(__dirname, '/../models/' + 'userAdmin.json'),
     // -----------------------------------------------
     new: (req, res) => {
          res.render('useradmin')
     },
     // ---------------------------------------------
     createUser: (req, res) => {
          let user = {
               cuit: req.body.cuit,
               razonsocial: req.body.razonsocial,
               email: req.body.email,
               password: req.body.password
          }
          let userExist = searchByCuit(req.body.cuit);
          if (userExist == null || userExist == '' || userExist == undefined) {
               addUser(user);
               return res.send('Registrado Administrador');
          } else {
               return res.send('CUIT utilizado');
          }
     }
}

module.exports = userAdmin;