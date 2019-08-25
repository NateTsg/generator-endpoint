import bcrypt from 'bcrypt';
import {model, Schema} from 'mongoose';

let UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        lowercase: true,
        enum: [
            'admin',
            'vendor',
            'customer'
        ]
    }
}, {collection: 'users'});

UserSchema.methods.comparePassword = (candidatePassword, password, next) => {
    bcrypt.compare(candidatePassword, password, (error, isMatch) => {
        if (error) {
            return next(error);
        }
        else {
            return next(null, isMatch);
        }
    });
}

UserSchema.methods.hash = (password, saltRound, next) => {
    bcrypt.hash(password, saltRound, (error, hash) => {
        if (error) {
            return next(error);
        }
        else {
            return next(null, hash);
        }
    });
}

export default model('User', UserSchema);