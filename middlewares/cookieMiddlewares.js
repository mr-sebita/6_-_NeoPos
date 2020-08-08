let db = require('../database/models');

function cookieMiddlewares(req, res, next) {

    if (req.cookies.recordame !== undefined && req.session.user == undefined) {
        db.User.findOne({
            where: {
                email: req.cookies.recordame
            }
        }).then((userResult) => {
            req.session.user = userResult;
            console.log(req.session.user);
        })
    }
    next();
}
module.exports = cookieMiddlewares;


// let userResult= await db.User.findOne({
//     where:{
//         email: req.cookies.recordame
//     }
// });
// req.session.user = userResult;
// console.log(req.session.user);
// }