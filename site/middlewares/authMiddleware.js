function authMiddleware(req, res, next) {
    //console.log("guest " + req.session.loggedUserId);
    if (req.session.loggedUserId != undefined) {
        next();
    } else {
        res.send("Esta página es solo usuarios registrados");
    }
}

module.exports = authMiddleware;
