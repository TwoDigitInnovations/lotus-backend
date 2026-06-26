'use strict';
const mongoose = require('mongoose');

const heroBannerSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    media: { type: String, required: true },
    title: { type: String, trim: true },
    subtitle: { type: String, trim: true },
    ctaText: { type: String, trim: true },
    ctaLink: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('HeroBanner', heroBannerSchema);
