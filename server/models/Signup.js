const mongoose = require('mongoose')
const { Schema } = mongoose;
const validator = require('validator');

const SignupSchema = new Schema({
    uerId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('not valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Users", SignupSchema)