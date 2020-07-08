var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user.model');
var config = require('../config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user)
            }
            else {
                return done(null, false);
            }
        });
    }
));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = function (params, err, next) {
    if (params.user.isAdmin) {
        return next();
    } else {
        var err = new Error('Only administrators are authorized to perform this operation.');
        err.status = 403;
        return next(err);
    }
}