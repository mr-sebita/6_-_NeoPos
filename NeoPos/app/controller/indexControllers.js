const fs = require('fs');
const path = require('path');
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

let inicio = {
     archivo: path.join(__dirname, '/../models/' + 'user.json'),
     index: (req, res) => {

          // let usuario = req.session.usuarioLogueado;
          console.log(req.session.usuarioLogueado);
          
          res.render('index1');
     }
}




module.exports= inicio;