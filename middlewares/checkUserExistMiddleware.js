
// idea de como implemntar un middle que verifique si el usuario ya existe!

function checkUserExistMiddleware( req , res , next ){
    /*
    * Revisa si el usuario está logueado, en caso contrario redirecciona al login
    */
    if ( req.session.user !== undefined ){
        res.redirect('/');
    }else{
        next();
    }
} 

module.exports= checkUserExistMiddleware;
