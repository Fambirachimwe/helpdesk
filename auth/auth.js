const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


const opts = {};
opts.secretOrKey = 'secret';
opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

passport.use(new JWTstrategy(opts, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub }).then((err, user) => {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    })
}));



module.exports = passport;
