let indexController = {
    index: ( req , res , next  ) => {
            res.render( 'index' ,{userData: req.session.user});
    }
}

module.exports = indexController;