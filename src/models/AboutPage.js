'use strict';
const mongoose = require('mongoose');

const aboutPageSchema = new mongoose.Schema(
  {
    hero: {
      heading: { type: String, default: 'About Us' },
      subheading: { type: String, default: '' },
    },
    story: {
      heading: { type: String, default: 'Our Story' },
      description: { type: String, default: '' },
      image: { type: String, default: '' },
      highlights: [
        {
          value: { type: String, default: '' },
          label: { type: String, default: '' },
        },
      ],
    },
    commitments: [
      {
        icon: { type: String, default: '' },
        title: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    leaders: [
      {
        name: { type: String, default: '' },
        role: { type: String, default: '' },
        description: { type: String, default: '' },
        image: { type: String, default: '' },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('AboutPage', aboutPageSchema);
