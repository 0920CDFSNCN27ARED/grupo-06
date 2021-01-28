function authMiddleware(req, res, next) {
    console.log("guest " + req.session.usuarioLogueado);
    if (req.session.usuarioLogueado != undefined) {
        next();
    } else {
        res.send("Esta página es solo usuarios registrados");
    }
}

module.exports = authMiddleware;
