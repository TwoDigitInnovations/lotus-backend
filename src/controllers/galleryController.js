'use strict';
const Gallery = require('@models/Gallery');
const response = require('@responses');

module.exports = {
  // Public: get all active gallery items (optionally filter by type)
  getAll: async (req, res) => {
    try {
      const { type } = req.query;
      const filter = { isActive: true };
      if (type) filter.type = type;

      let { limit = 200 } = req.query;
      limit = Math.min(parseInt(limit) || 200, 500);
      const items = await Gallery.find(filter).sort('order -createdAt').limit(limit);
      return response.ok(res, { data: items });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Public: get single gallery item
  getById: async (req, res) => {
    try {
      const item = await Gallery.findOne({ _id: req.params.id, isActive: true });
      if (!item) return response.notFound(res, { message: 'Gallery item not found' });
      return response.ok(res, { data: item });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all (including inactive)
  adminGetAll: async (req, res) => {
    try {
      let { page = 1, limit = 20, type } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (type) filter.type = type;

      const [items, total] = await Promise.all([
        Gallery.find(filter).sort('order -createdAt').skip((page - 1) * limit).limit(limit),
        Gallery.countDocuments(filter),
      ]);

      return response.ok(res, {
        data: items,
        pagination: { total, totalPages: Math.ceil(total / limit), currentPage: page, limit },
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: create gallery item
  create: async (req, res) => {
    try {
      const { name, location, type, videoUrl, order, isActive } = req.body;
      if (!name || !type) return response.badReq(res, { message: 'Name and type are required' });
      if (type === 'video' && !videoUrl && !req.file) return response.badReq(res, { message: 'videoUrl or video file is required for video type' });

      let imagePath = type === 'photo' && req.file ? req.file.path : undefined;
      if (type === 'video' && videoUrl) {
        const m = videoUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
        if (m) {
          imagePath = `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
        }
      }

      const item = await Gallery.create({
        name,
        location,
        type,
        image: imagePath,
        videoUrl: type === 'video' ? (req.file ? req.file.path : videoUrl) : undefined,
        order: order ? parseInt(order) : 0,
        isActive: isActive !== 'false' && isActive !== false,
      });

      return response.created(res, { message: 'Gallery item created', data: item });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update gallery item
  update: async (req, res) => {
    try {
      const { name, location, type, videoUrl, order, isActive } = req.body;
      const update = {};

      const itemToUpdate = await Gallery.findById(req.params.id);
      if (!itemToUpdate) return response.notFound(res, { message: 'Gallery item not found' });

      if (name) update.name = name;
      if (location !== undefined) update.location = location;
      if (type) update.type = type;
      
      const currentType = type || itemToUpdate.type;
      if (req.file) {
        if (currentType === 'video') {
          update.videoUrl = req.file.path;
        } else {
          update.image = req.file.path;
        }
      }
      if (videoUrl !== undefined) {
        update.videoUrl = videoUrl;
        if (currentType === 'video' && videoUrl) {
          const m = videoUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/);
          if (m) {
            update.image = `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
          }
        }
      }
      if (order !== undefined) update.order = parseInt(order);
      if (isActive !== undefined) update.isActive = isActive !== 'false' && isActive !== false;

      const item = await Gallery.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!item) return response.notFound(res, { message: 'Gallery item not found' });

      return response.ok(res, { message: 'Gallery item updated', data: item });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete gallery item
  remove: async (req, res) => {
    try {
      const item = await Gallery.findByIdAndDelete(req.params.id);
      if (!item) return response.notFound(res, { message: 'Gallery item not found' });
      return response.ok(res, { message: 'Gallery item deleted successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
