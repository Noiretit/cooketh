/*const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const dbName = "cooketh";
const mongoUrl = `mongodb://localhost/${dbName}`;
const mongoConfig = {
    useNewUrlParser: true
};
mongoose.connect(mongoUrl, mongoConfig);

const recipesList = [{
        title: 'Tortilla Española',
        typeOfFood: 'Mediterranean',
        diet: 'All',
        allergies: ['Eggs'],
        serves: '6',
        price: '10€',
        ingredients: 'Eggs, potatoes, onions, olive oil, a pinch of salt',
        description: '70 year old family recipe that will leave you speachless. Easy to prepare, everyone likes it.',
        pictures: 'https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2019/05/tortilla-espa%C3%B1ola.jpg'
    }, {
        title: 'Xatonada',
        typeOfFood: 'Catalan',
        diet: 'All',
        allergies: ['Fish', 'Tree nuts', 'Vegetables'],
        serves: '4',
        price: '12€',
        ingredients: 'Endives, unsalted cod, tuna in oil, pickled anchovies, chamomile olives, romesco sauce',
        description: 'Delicious salad from the catalan shores of Garraf & Penedés. Contains one of the most famous catalan sauces called "romesco"',
        pictures: 'https://canalcocina.es/medias/_cache/zoom-6bffbe2546da62011ed1d08c149c5918-920-518.jpg'
    }, {
        title: 'Fricandó',
        typeOfFood: 'Catalan',
        diet: 'All',
        allergies: ['Wheat', 'Vegetables', 'Tree nuts'],
        serves: '4',
        price: '15€',
        ingredients: 'Veal, tomatoes, onions, water, bayleaf, senderuelas, white wine, olive oil, wheat flour, salt, grounded black pepper, garlic, toasted almonds, fresh parsley. ',
        description: 'Tradicional recipe from Catalunya, created on Medieval times. Great to serve one day after. Seasonal dish: autumn.',
        pictures: 'https://vod-hogarmania.atresmedia.com/cocinatis/images/images01/2019/04/01/5ca1d071fa7dec0001ed6d1b/1239x697.jpg'
    }, {
        title: 'Vietnamise rolls',
        typeOfFood: 'Vietnamise',
        diet: 'Vegan',
        allergies: ['Vegetables'],
        serves: '8',
        price: '15€',
        ingredients: 'Rice noodles, sesame oil, sea salt, butter lettuce, red cabbage, carrots, small cucumbers, green onions, fresh cilantro, fresh mint, rice paper',
        description: 'Fresh, not fried, spring rolls. Perfect for a party appetizer or light meal. Combined with a peanut sauce is amzing',
        pictures: 'https://www.archanaskitchen.com/images/archanaskitchen/World_Appetizers/Vietnamese_Non_Fried_Spring_Roll_Recipe-1.jpg'
    }, {
        title: 'Lentil baked Ziti',
        typeOfFood: 'Italian',
        diet: 'Vegetarian',
        allergies: ['Vegetables', 'Legumes', 'Wheat', 'Dairy'],
        serves: '8',
        price: '18€',
        ingredients: 'Whole grain zity pasta, grated mozzarella, salt, ground black pepper, pepper flakes, marinara sauce, cottage cheese, basil leaves. For the lentils: brown lentils, olive oil, onion, salt, garlic, water.',
        description: 'This healthy vegetarian baked ziti recipe includes lentils for protein. It’s a delicious dinner that makes great leftovers.',
        pictures: 'https://images.squarespace-cdn.com/content/v1/5d28c7af5d977d000185af9f/1563890952912-F5A79MHSN8HF3K3NTQ4I/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_47221.jpg?format=2500w'
    }, {
        title: 'Quiche lorraine',
        typeOfFood: 'French',
        diet: 'All',
        allergies: ['Eggs', 'Dairy', 'Gluten'],
        serves: '6',
        price: '12,50€',
        ingredients: 'Pâte brisée, Eggs, Milk, Smoked lardons, Gruyère, Crème fraîche, Double cream, Salt',
        description: 'This mouth-watering, rich Lorraine dish is definitely one of the best known food specialities from France! Try its light custard with lots of bacon in a buttery crust.',
        pictures: 'https://i.pinimg.com/originals/67/d9/b6/67d9b6e4605e2ed14fe0529148b7fa2d.jpg'
    },
    {
        title: 'Pad Thai',
        typeOfFood: 'Thai',
        diet: 'All',
        allergies: ['Eggs', 'Shellfish', 'Peanuts', 'Vegetables', 'Soy'],
        serves: '4',
        price: '10€',
        ingredients: 'Onions, Roasted peanuts, Brown sugar, Prawns, Sunflower oil, Tofu, Beansprouts, Shallots, Eggs, Lemo, Rice noodles, Fish sauce (nuoc nam)',
        description: `Pad Thai is a Thai noodle stir fry with a sweet-savoury-sour sauce scattered with crushed peanuts. It is one of the world's most beloved noodle dishes.If you 've been disappointed by basic Pad Thai recipes in the past, have faith – I promise this one delivers!`,
        pictures: 'https://img.over-blog-kiwi.com/0/94/02/18/20190703/ob_2dee0b_8476-pad-thai-aux-crevettes-brocol.jpg'
    },
    {
        title: 'Boeuf bourguignon',
        typeOfFood: 'French',
        diet: 'All',
        allergies: ['Vegetables'],
        serves: '6',
        price: '18€',
        ingredients: 'Beef, Bacon, Butter, Small onions, Carrot, Garlic, Flour, Red wine, Meat broth, Mushrooms, Salt, Pepper',
        description: 'The bœuf bourguignon is a cooking recipe of beef stew, traditional of Burgundy cuisine (France), cooked in red Burgundy wine, with a garnish of mushrooms, small onions and bacon.',
        pictures: 'https://cooking-chef.sa.metacdn.com/sites/default/files/recettes/boeuf-bourguignon-recette_4x3.jpg'
    },
    {
        title: 'Pumpkin and goat cheese pie',
        typeOfFood: 'All',
        diet: 'Vegeterian',
        allergies: ['Eggs', 'Dairy', 'Peanuts'],
        serves: '8',
        price: '13€',
        ingredients: 'Puff paste, Pumpkin, Frensh cream, Mustard, Eggs, Salt, Pepper, Nutmeg, Parsley, Chive, Grated cheese, Nuts, Goat cheese',
        description: 'Try this pumpkin and goat cheese pie, perfect for fall and winter days',
        pictures: 'https://img-3.journaldesfemmes.fr/wWlN-8vlK3rYZhm16N8_OQA4Wlw=/748x499/smart/f059955c128f450386c8a0fd06dff456/recipe-jdf/320262.jpg'
    }
];


Recipe.create(recipesList)
    .then(recipes => console.log(`${recipes.length} recipes created`))
    .catch((err) => console.log(`Error while creating the recipes`, err))*/