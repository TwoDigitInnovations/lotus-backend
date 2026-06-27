'use strict';
const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    // Welcome section on home page
    welcome: {
      heading: { type: String, default: 'Welcome to Lotusss' },
      subheading: { type: String, default: '' },
      description: { type: String, default: '' },
      images: { type: [String], default: [] },
    },
    // Why Choose Us section
    whyChooseUs: {
      heading: { type: String, default: 'Why Choose Us' },
      features: [
        {
          icon: { type: String, default: '' },
          title: { type: String, default: '' },
          description: { type: String, default: '' },
        },
      ],
    },
    // Testimonials / People who wished us
    testimonials: [
      {
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        quote: { type: String, default: '' },
        image: { type: String, default: '' },
        rating: { type: Number, default: 5 },
      },
    ],
    // Footer content
    footer: {
      description: { type: String, default: '' },
      phone: { type: String, default: '' },
      email: { type: String, default: '' },
      address: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
      socialLinks: {
        instagram: { type: String, default: '' },
        facebook: { type: String, default: '' },
        twitter: { type: String, default: '' },
      },
    },
    // Legal pages
    privacyPolicy: { type: String, default: '', maxlength: 200000 },
    termsOfService: { type: String, default: '', maxlength: 200000 },
  },
  { timestamps: true },
);

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
