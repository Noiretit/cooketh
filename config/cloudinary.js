require('dotenv').config();

// config/ cloudinary.js
const cloudinary = require('cloudinary').v2;
const {
    CloudinaryStorage
} = require('multer-storage-cloudinary');
const multer = require('multer');

//Need to put the values below on the .env file
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

var storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'mes-images', // The name of the folder in cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],
    filename: function (req, file, cb) {
        cb(null, file.originalname); // The file on cloudinary would have the same name as the original file name
    }
});

const uploadCloud = multer({
    storage: storage
});

module.exports = uploadCloud;