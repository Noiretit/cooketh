const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    diet: {
        type: String,
        required: true
    },
    allergies: [{
        type: String,
        required: true
    }],
    password: {
        type: String,
        required: true
    },
    isAUser: {
        type: Boolean,
        default: true
    },
    picture: String,
    description: String,
    facebook: String,
    instagram: String,
    twitter: String,
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;