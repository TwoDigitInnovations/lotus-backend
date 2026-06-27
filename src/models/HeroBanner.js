'use strict';
const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    media: { type: String, required: true },
    title: { type: String, trim: true, maxlength: 200 },
    subtitle: { type: String, trim: true, maxlength: 300 },
    ctaText: { type: String, trim: true, maxlength: 100 },
    ctaLink: { type: String, trim: true, maxlength: 500 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

heroBannerSchema.index({ isActive: 1, order: 1 });

module.exports = mongoose.model('HeroBanner', heroBannerSchema);
