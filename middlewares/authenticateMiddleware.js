const db = require("../database/models");

function authenticateMiddleware(req, res, next) {
    const id = req.session.loggedUserId;
    //console.log(id);
    if (!id) return next();

    const loggedUser = db.User.findAll((user) => {
        return user.id == id;
    });

    if (!loggedUser) {
        delete req.session.loggedUserId;
        return next();
    }

    req.loggedUser = loggedUser;
    //console.log(req.loggedUser);
    next();
}

module.exports = authenticateMiddleware;
