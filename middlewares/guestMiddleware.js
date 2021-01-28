function guestMiddleware(req, res, next) {
    //console.log("guest " + req.session.usuarioLogueado);
    if (req.session.usuarioLogueado == undefined) {
        next();
    } else {
        // Si el usuario ya está logueado lo redirige al Login para que siga navegando.
        res.redirect("/");
    }
}

module.exports = guestMiddleware;
