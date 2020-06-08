const fs= require('fs');
const path = require('path');

// FUNCIONES PRIVADAS

// Leer JSON
function readJson(filename) {
     return JSON.parse(fs.readFileSync (user.archivo, 'utf-8'));
 }
// Escribir en el JSON
function saveJson(users){
     return fs.writeFileSync(user.archivo, JSON.stringify(users, null , ' ') )
}
// Guardar un usuario
function addUser(user){
     let users = readJson();
     users.push(user);
     saveJson(users);
}
// Buscar por id
function searchByEmail(email){
     let users = readJson();
     console.log(email);
     
     let user= users.filter( u => {
          
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

// FUNCIONES PÚBLICAS
let user={
     archivo: path.join(__dirname, '/../models/' + 'user.json'),
     // -----------------------------------------------------------------------------------------------------------
     new: (req,res)=>{
          res.render('user')
     },
     // -----------------------------------------------------------------------------------------------------------
     createUser: (req, res) =>{ //creación del usuario!
          let user= {
               id: req.body.id,
               name : req.body.name,
               surname: req.body.surname,
               phone: req.body.phone,
               email: req.body.email,
               password: req.body.password
          }
          let userExist = searchByEmail(req.body.email);
          console.log(userExist);
          
          if (userExist == null) {
               addUser(user);
               return res.send('bien!');
           } else {
               return res.send('Cliente ya existente');
           }
     },
     // -----------------------------------------------------------------------------------------------------------
     newadmin: (req,res)=>{
          res.render('useradmin')
     },
}

module.exports= user;