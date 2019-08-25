import _ from 'lodash';
import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';

import config from '../configs/config';

let getUser = (user) => {
    return {
        _id: user._id,
        email: user.email,
        password: user.password,
        user_type: user.user_type
    };
}

let authentication = (request, response, next) => {
    passport.authenticate('local', {session: false}, (error, user, info) => {
        if (error) {
            return response.status(500).send(error);
        }
        else if (!user) {
            return response.status(401).json({"message": "Login Failed: Invalid email or password!"});
        }
        else {
            request.logIn(user, {session: false}, (error) => {
                if (error) {
                    return response.status(401).json({"message": "Login Failed: Invalid email or password!"});
                }
                else {
                    request.user = user;
                }
                next();
            })
        }
    })(request, response, next);
}

let generateAccessToken = (request, response, next) => {
    request.token = jsonwebtoken.sign(getUser(request.user), config.security.secret);
    next();
}

let response = (request, response) => {
    response.status(200).json({
        user_type: request.user.user_type,
        token: request.token
    });
}

let checkAccessLevel = (...authorizedRoles) => {
    return (request, response, next) => {
        if (_.indexOf(authorizedRoles, request.user.user_type) == -1) {
            response.status(403).json({"message": `${request.user.user_type} not is not authorized to access the specified resource.`});
        }
        else {
            next();
        }
    }
}

export default { getUser, authentication, generateAccessToken, response , checkAccessLevel};
