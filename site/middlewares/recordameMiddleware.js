const db = require("../database/models");

//Pasaría los datos de la cookie a session

async function recordameMiddleware(req, res, next) {
    const id = req.cookies.recordame;
    //console.log(req.cookies.recordame);
    //console.log(req.session.usuarioLogueado);

    if (
        req.cookies.recordame != undefined &&
        req.session.loggedUserId == undefined
    ) {
        const user = await db.User.findByPk(id);
        req.loggedUser = user;
    }

    //console.log(usuarioALoguearse);

    //console.log(req.session.usuarioLogueado);

    next();
}

module.exports = recordameMiddleware;
