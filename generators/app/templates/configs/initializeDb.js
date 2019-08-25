import mongoose from 'mongoose';
import config from './config';

export default callback => {
    let dbUri = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.dbname;
    let connection = mongoose.connect(dbUri, {useNewUrlParser: true});

    mongoose.connection.on('connected', () => {
        console.log('Database connection established.');
    });

    mongoose.connection.on('error', (error) => {
        console.log('Database connection error: ' + error);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Database connection terminated.');
    });
}