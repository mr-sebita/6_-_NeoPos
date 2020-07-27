function guestMiddlewares( req , res , next ){
    if ( req.session.user == undefined ){
        next();
    }else{
        res.redirect('shop', {user : req.session.user});
    }
} 

module.exports= guestMiddlewares; 