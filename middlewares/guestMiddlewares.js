function guestMiddlewares( req , res , next ){
    if ( req.session.user.grupo == admin ){
        let admin= req.session.user;
        res.render('shop', {admin : admin});
        next();
    }else{
        let user= req.session.user;
        res.redirect('shop', {user : user});
        next();
    }
} 

module.exports= guestMiddlewares;