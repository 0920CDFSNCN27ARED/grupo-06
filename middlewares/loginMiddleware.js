function loginMiddleware(req, res, next) {
    res.locals.login = req.session.user;
    next();
}

module.exports = loginMiddleware;
