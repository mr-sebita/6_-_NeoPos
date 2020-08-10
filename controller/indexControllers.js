const db = require('../database/models');

let indexController = {
    index: async ( req , res , next  ) => {
        let shops = await db.Shop.findAll()
        console.log(shops) 
        res.render( 'index' ,{ user : req.session.user , shops: shops });
    }
}

module.exports = indexController;