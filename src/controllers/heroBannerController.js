'use strict';
const HeroBanner = require('@models/HeroBanner');
const response = require('@responses');

module.exports = {
  // Public: get all active banners ordered
  getAll: async (_req, res) => {
    try {
      const banners = await HeroBanner.find({ isActive: true }).sort('order');
      return response.ok(res, { data: banners });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all banners
  adminGetAll: async (_req, res) => {
    try {
      const banners = await HeroBanner.find().sort('order');
      return response.ok(res, { data: banners });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: create banner
  create: async (req, res) => {
    try {
      const { type, title, subtitle, ctaText, ctaLink, order, isActive, mediaUrl } = req.body;
      if (!req.file && !mediaUrl) return response.badReq(res, { message: 'Media file or URL is required' });

      const banner = await HeroBanner.create({
        type: type || 'image',
        media: req.file ? req.file.path : mediaUrl,
        title,
        subtitle,
        ctaText,
        ctaLink,
        order: order ? parseInt(order) : 0,
        isActive: isActive !== 'false',
      });

      return response.created(res, { message: 'Banner created successfully', data: banner });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update banner
  update: async (req, res) => {
    try {
      const { type, title, subtitle, ctaText, ctaLink, order, isActive } = req.body;
      const update = {};

      if (type) update.type = type;
      if (title !== undefined) update.title = title;
      if (subtitle !== undefined) update.subtitle = subtitle;
      if (ctaText !== undefined) update.ctaText = ctaText;
      if (ctaLink !== undefined) update.ctaLink = ctaLink;
      if (order !== undefined) update.order = parseInt(order);
      if (isActive !== undefined) update.isActive = isActive !== 'false' && isActive !== false;
      if (req.file) update.media = req.file.path;

      const banner = await HeroBanner.findByIdAndUpdate(req.params.id, update, { new: true });
      if (!banner) return response.notFound(res, { message: 'Banner not found' });

      return response.ok(res, { message: 'Banner updated successfully', data: banner });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete banner
  remove: async (req, res) => {
    try {
      const banner = await HeroBanner.findByIdAndDelete(req.params.id);
      if (!banner) return response.notFound(res, { message: 'Banner not found' });
      return response.ok(res, { message: 'Banner deleted successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: reorder banners
  reorder: async (req, res) => {
    try {
      const { items } = req.body; // [{ id, order }]
      if (!Array.isArray(items)) return response.badReq(res, { message: 'items array required' });

      await Promise.all(
        items.map(({ id, order }) => HeroBanner.findByIdAndUpdate(id, { order })),
      );

      return response.ok(res, { message: 'Banners reordered successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
