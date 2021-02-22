const db = require("../database/models");

function recordameMiddleware(req, res, next) {
    //console.log(req.cookies.recordame);
    //console.log(req.session.usuarioLogueado);
    let usuarioALoguearse;
    if (
        req.cookies.recordame != undefined &&
        req.session.usuarioLogueado == undefined
    ) {
        const user = db.User.findAll();
        for (let i = 0; i < user.length; i++) {
            if (user[i].email == req.cookies.recordame) {
                usuarioALoguearse = user[i];
                // console.log(usuarioALoguearse);
                break;
            }
        }
        //console.log(usuarioALoguearse);
        req.loggedUser = usuarioALoguearse;
        //console.log(req.session.usuarioLogueado);
    }
    next();
}

module.exports = recordameMiddleware;
