'use strict';
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Contact', contactSchema);
