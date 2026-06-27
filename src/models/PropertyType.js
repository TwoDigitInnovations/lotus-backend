'use strict';
const mongoose = require('mongoose');

const propertyTypeSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, maxlength: 100 },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('PropertyType', propertyTypeSchema);
