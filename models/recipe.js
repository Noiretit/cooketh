const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    typeOfFood: {
        type: String,
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
    serves: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictures: {
        type: String,
        required: true
    },
    chef: {
        type: Schema.Types.ObjectId,
        ref: 'Chef'
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;