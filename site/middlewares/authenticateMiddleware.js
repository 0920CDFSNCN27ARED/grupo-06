const db = require("../database/models");

// Comprueba que el usuario logueado esté en la db

async function authenticateMiddleware(req, res, next) {
    const id = req.session.loggedUserId;
    //console.log(id);
    if (!id) return next();

    const loggedUser = await db.User.findByPk(id);

    if (!loggedUser) {
        delete req.session.loggedUserId;
        return next();
    }

    req.loggedUser = loggedUser;

    res.locals.user = loggedUser;
    //console.log(req.loggedUser);
    next();
}

module.exports = authenticateMiddleware;
