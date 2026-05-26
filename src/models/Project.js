'use strict';
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
  { label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false },
);

const photoSchema = new mongoose.Schema(
  { name: String, location: String, image: String },
  { _id: false },
);

const videoSchema = new mongoose.Schema(
  { name: String, location: String, thumbnail: String, videoUrl: String },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    propertySize: { type: String, trim: true },
    price: { type: String, trim: true },
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
    overview: { type: String },
    documents: [documentSchema],
    gallery: {
      photos: [photoSchema],
      videos: [videoSchema],
    },
    aboutCity: {
      name: { type: String },
      text: { type: String },
    },
    aboutSector: {
      name: { type: String },
      text: { type: String },
    },
    reraNumber: { type: String, trim: true },
    reraUrl: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Project', projectSchema);
