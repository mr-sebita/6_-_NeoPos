let indexController = {
    index: ( req , res , next  ) => {
            res.render( 'index' ,{user : req.session.user});
    }
}

module.exports = indexController;