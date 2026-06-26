'use strict';
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Image-only storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file) => ({
    folder: 'cms',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    public_id: Date.now() + '-' + file.originalname.replace(/\s+/g, '_'),
  }),
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Media storage (images + videos) for hero banners
const mediaStorage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file) => {
    const isVideo = file.mimetype.startsWith('video/');
    return {
      folder: 'cms/banners',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: isVideo
        ? ['mp4', 'mov', 'webm']
        : ['jpg', 'jpeg', 'png', 'webp'],
      public_id: Date.now() + '-' + file.originalname.replace(/\s+/g, '_'),
    };
  },
});

const mediaFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/quicktime', 'video/webm'];
  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'), false);
};

const mediaUpload = multer({ storage: mediaStorage, fileFilter: mediaFilter, limits: { fileSize: 50 * 1024 * 1024 } });

module.exports = { upload, mediaUpload, cloudinary };
