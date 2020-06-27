var user = require('../controller/userControllers');
function clientMiddlewares( req , res , next ){
    if ( req.session.usuarioLogueado == undefined ){
        res.render('login');
    }else{
        next();
    }
} 

module.exports= clientMiddlewares; 