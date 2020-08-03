function guestMiddlewares( req , res , next ){
    /*
    * Revisa si el usuario está logueado, en caso contrario redirecciona al login
    */
    if ( req.session.user === undefined ){
        res.redirect('/user/login')
    }else{
        next();
    }
} 

module.exports= guestMiddlewares;