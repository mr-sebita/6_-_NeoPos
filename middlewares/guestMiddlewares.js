function guestMiddlewares( req , res , next ){
    if ( req.session.user == undefined ){
        next();
    }else{
        res.redirect('shop');
    }
} 

module.exports= guestMiddlewares; 