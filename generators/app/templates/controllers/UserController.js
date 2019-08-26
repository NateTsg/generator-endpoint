import express from 'express';

import User from '../models/User';

import authMiddleware from '../middlewares/AuthMiddleware';


let router = express.Router();

router.post('/login', 
    authMiddleware.authentication, 
    authMiddleware.generateAccessToken, 
    authMiddleware.response);


/**
 * Check If Email is Available
 * @input {email}
 */
router.post('/checkEmailIsUnique', (request, response,next) => {
    User.findOne({email: request.body.email}, (error, user) => {
        if (error) {
            next(error,request,response)
        }
        else {
            return response.status(200).send({isAvailable: false});
        }
    });
});

export default router;