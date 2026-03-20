const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');  // stores multer form's data

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET, 
});

// Defining storage area in cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'WanderLust_Img',  // can be set any name means we will store in this folder at cloudinary
    allowedFormets: ["png", "jpg", "jpeg", "pdf"],
  },
});

module.exports = {
    cloudinary,
    storage
};   