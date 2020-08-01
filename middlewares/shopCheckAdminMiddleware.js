/**
 * 
 * Middleware para verificar usuarios para la vista shop
 * 
 */
function shopCheckAdminMiddleware(req, res, next){
    if(req.session.user.grupo == 'admin'){
       return  true; 
    }else{
        return false;
    }
}

module.exports = shopCheckAdminMiddleware;