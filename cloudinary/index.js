const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'yelpcamp_images',
    allowedFormats: ['jpeg', 'png', 'jpg'], // supports promises as well
  }
});

module.exports = { cloudinary, storage }