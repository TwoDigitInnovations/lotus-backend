'use strict';
const PropertyType = require('@models/PropertyType');
const response = require('@responses');

module.exports = {
  // Public
  getAll: async (_req, res) => {
    try {
      const items = await PropertyType.find({ isActive: true }).sort('order');
      return response.ok(res, { data: items });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all including inactive
  adminGetAll: async (_req, res) => {
    try {
      const items = await PropertyType.find().sort('order');
      return response.ok(res, { data: items });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: create
  create: async (req, res) => {
    try {
      const { label, order, isActive, imageUrl } = req.body;
      if (!label) return response.badReq(res, { message: 'Label is required' });
      const image = req.file ? req.file.path : imageUrl || '';
      if (!image) return response.badReq(res, { message: 'Image is required' });

      const item = await PropertyType.create({
        label: label.toUpperCase(),
        image,
        order: order ? parseInt(order) : 0,
        isActive: isActive !== 'false',
      });
      return response.created(res, { message: 'Property type created', data: item });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update
  update: async (req, res) => {
    try {
      const { label, order, isActive } = req.body;
      const update = {};
      if (label !== undefined) update.label = label.toUpperCase();
      if (order !== undefined) update.order = parseInt(order);
      if (isActive !== undefined) update.isActive = isActive !== 'false' && isActive !== false;
      if (req.file) update.image = req.file.path;

      const item = await PropertyType.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!item) return response.notFound(res, { message: 'Property type not found' });
      return response.ok(res, { message: 'Property type updated', data: item });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete
  remove: async (req, res) => {
    try {
      const item = await PropertyType.findByIdAndDelete(req.params.id);
      if (!item) return response.notFound(res, { message: 'Property type not found' });
      return response.ok(res, { message: 'Property type deleted' });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: reorder
  reorder: async (req, res) => {
    try {
      const { items } = req.body;
      if (!Array.isArray(items)) return response.badReq(res, { message: 'items array required' });
      await Promise.all(items.map(({ id, order }) => PropertyType.findByIdAndUpdate(id, { order })));
      return response.ok(res, { message: 'Reordered successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
