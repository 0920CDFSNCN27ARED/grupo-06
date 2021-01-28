const getUsers = require("../utils/getUsers");

function authenticateMiddleware(req, res, next) {
    const id = req.session.loggedUserId;
    //console.log(id);
    if (!id) return next();

    const users = getUsers();

    const loggedUser = users.find((user) => {
        return user.id == id;
    });

    if (!loggedUser) {
        delete req.session.loggedUserid;
        return next();
    }

    req.loggedUser = loggedUser;
    //console.log(req.loggedUser);
    next();
}

module.exports = authenticateMiddleware;
