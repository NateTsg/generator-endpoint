import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import compression from 'compression';

import routes from './routes/routes';
import config from './configs/config';
import initializeDb from './configs/initializeDb';

let app = express();
let path = require('path')
// Middlewares
passport.use(config.localStrategy);
passport.use(config.jwtStrategy);

passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(error, user) {
        done(error, user._id);
    });
});

app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: config.app.bodyLimit}));
app.use(cors());
app.use(helmet());

// Initialize Database Connection
initializeDb();

// Routes
app.use('/v1', routes);

app.listen(config.app.port, function() {
    console.log('<%= app_name%> API Running on port ' + config.app.port);
});

export default app;