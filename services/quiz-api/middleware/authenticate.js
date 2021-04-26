
require('../config/passport')(passport);

function checkJWT (req, res, next){
    passport.authenticate('jwt', { session: false }, function(err, user, info) { 
        if (err) { return next(err); } 
        if (!user) { return res.status(403).send("Unauthorized").end(); } 
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = { checkJWT };
