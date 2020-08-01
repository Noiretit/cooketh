const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chefSchema = new Schema({
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
    mainCookSpecialty: {
        type: String,
        required: true
    },
    workingDays: [{
        type: String,
        required: true
    }],
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: String,
    facebook: String,
    instagram: String,
    twitter: String,
    recipes: [{
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: 'Booking'
    }],
}, {
    timestamps: true
});

const Chef = mongoose.model('Chef', chefSchema);

module.exports = Chef;