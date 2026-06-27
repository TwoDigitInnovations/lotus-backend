'use strict';
const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 200 },
    location: { type: String, trim: true, maxlength: 200 },
    type: { type: String, enum: ['photo', 'video'], required: true },
    image: { type: String },
    videoUrl: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

gallerySchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
