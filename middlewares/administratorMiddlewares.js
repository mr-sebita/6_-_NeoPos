function administratorMiddlewares( req , res , next ){
    /*
    * Establece permisos de administrador, caso contrario habría que mandaar un msj avisando que no tiene permisos
    */
    if( req.session.user.grupo === 'admin' ){
        next();
    }else{
        res.redirect( '/' );
    }
}

module.exports= administratorMiddlewares;