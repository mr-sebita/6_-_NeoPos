function clientMiddlewares( req , res , next ){
    if ( req.session.usuarioLogueado == undefined ){
        res.send('Esta página es solo para usuarios');
    }else{
        next();
    }
} 

module.exports= clientMiddlewares; 