import passportJwt from 'passport-jwt';
import { Strategy } from 'passport-local';

import User from '../models/User';

let app = {
    port: 3000,
    bodyLimit: "100kb"
}

let db = {
    port: "27017",
    host: "localhost",
    dbname: "<%= app_name %>-db"
}

let roles = {
 
}

let security =  {
    saltRound: 10,
    secret: "THIS_IS_THE_SECERT_KEY",
    token_expiration: 60 * 60 * 24 * 30
}

let localStrategy = new Strategy({usernameField: "email", passwordField: "password"},
    (email, password, done) => {
        User.findOne({email: email}, (error, user) => {
            if (error) {
                return done(error);
            }
            else if (!user) {
                return done(null, false, { "message": "Login Failed: Invalid email or password!" });
            }
            else {
                user.comparePassword(password, user.password, (error, isMatch) => {
                    if (error) {
                        return done(null, false, error);
                    }
                    else if (!isMatch) {
                        return done(null, false, { "message": "Login Failed: Invalid email or password!" });
                    }
                    else {
                        return done(null, user);
                    }
                })
            }
        });
    }
)

let jwtStrategy = new passportJwt.Strategy(
    {
        jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: security.secret
    }, (jwtPayload, next) => {
        User.findById(jwtPayload._id, (error, user) => {
            if (error) {
                return next(error, false);
            }
            if (user) {
                next(null, user);
            }
            else {
                next(null, false);
            }
        });
    }
)


export default { app, db, roles, security, localStrategy, jwtStrategy }