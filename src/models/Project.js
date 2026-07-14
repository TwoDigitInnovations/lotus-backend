'use strict';
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  { label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false },
);

const photoSchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: String,
  location: String,
  image: String,
});

const videoSchema = new mongoose.Schema({
  name: String,
  description: String,
  slug: String,
  location: String,
  thumbnail: String,
  videoUrl: String,
});

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    propertySize: { type: String, trim: true, maxlength: 100 },
    price: { type: String, trim: true, maxlength: 100 },
    status: {
      type: String,
      enum: ['Under Construction', 'Ready to Move'],
      default: 'Under Construction',
    },
    category: {
      type: String,
      enum: ['residential', 'commercial'],
      required: true,
    },
    image: { type: String },
    overview: { type: String, maxlength: 50000 },
    documents: [documentSchema],
    gallery: {
      photos: [photoSchema],
      videos: [videoSchema],
    },
    aboutCity: {
      name: { type: String, maxlength: 100 },
      text: { type: String, maxlength: 10000 },
    },
    aboutSector: {
      name: { type: String, maxlength: 100 },
      text: { type: String, maxlength: 10000 },
    },
    reraNumber: { type: String, trim: true, maxlength: 50 },
    reraUrl: { type: String, trim: true, maxlength: 500 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

projectSchema.index({ isActive: 1, createdAt: -1 });
projectSchema.index({ category: 1, isActive: 1 });
projectSchema.index({ isFeatured: 1, isActive: 1 });

module.exports = mongoose.model('Project', projectSchema);
