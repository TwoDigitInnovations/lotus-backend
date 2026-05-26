'use strict';
const Project = require('@models/Project');
const response = require('@responses');

module.exports = {
  // Public: get all active projects
  getAll: async (req, res) => {
    try {
      const { category, status, featured } = req.query;
      const filter = { isActive: true };
      if (category) filter.category = category;
      if (status) filter.status = status;
      if (featured === 'true') filter.isFeatured = true;

      const projects = await Project.find(filter)
        .select('-gallery -aboutCity -aboutSector -documents')
        .sort('-createdAt');

      return response.ok(res, { data: projects });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Public: get single project by id
  getById: async (req, res) => {
    try {
      const project = await Project.findOne({ _id: req.params.id, isActive: true });
      if (!project) return response.notFound(res, { message: 'Project not found' });
      return response.ok(res, { data: project });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all projects including inactive
  adminGetAll: async (req, res) => {
    try {
      let { page = 1, limit = 20, category, status, isActive } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (category) filter.category = category;
      if (status) filter.status = status;
      if (isActive !== undefined) filter.isActive = isActive === 'true';

      const [projects, total] = await Promise.all([
        Project.find(filter)
          .select('-gallery -aboutCity -aboutSector -documents')
          .sort('-createdAt')
          .skip((page - 1) * limit)
          .limit(limit),
        Project.countDocuments(filter),
      ]);

      return response.ok(res, {
        data: projects,
        pagination: { total, totalPages: Math.ceil(total / limit), currentPage: page, limit },
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: create project
  create: async (req, res) => {
    try {
      const {
        name, location, propertySize, price, status, category,
        overview, documents, gallery, aboutCity, aboutSector,
        reraNumber, reraUrl, isFeatured, isActive,
      } = req.body;

      if (!name || !location || !category) {
        return response.badReq(res, { message: 'Name, location and category are required' });
      }

      const project = await Project.create({
        name, location, propertySize, price, status, category,
        image: req.file ? req.file.path : undefined,
        overview,
        documents: documents ? (typeof documents === 'string' ? JSON.parse(documents) : documents) : [],
        gallery: gallery ? (typeof gallery === 'string' ? JSON.parse(gallery) : gallery) : { photos: [], videos: [] },
        aboutCity: aboutCity ? (typeof aboutCity === 'string' ? JSON.parse(aboutCity) : aboutCity) : {},
        aboutSector: aboutSector ? (typeof aboutSector === 'string' ? JSON.parse(aboutSector) : aboutSector) : {},
        reraNumber, reraUrl,
        isFeatured: isFeatured === 'true' || isFeatured === true,
        isActive: isActive !== 'false' && isActive !== false,
      });

      return response.created(res, { message: 'Project created successfully', data: project });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update project
  update: async (req, res) => {
    try {
      const {
        name, location, propertySize, price, status, category,
        overview, documents, gallery, aboutCity, aboutSector,
        reraNumber, reraUrl, isFeatured, isActive,
      } = req.body;

      const update = {};
      if (name) update.name = name;
      if (location) update.location = location;
      if (propertySize !== undefined) update.propertySize = propertySize;
      if (price !== undefined) update.price = price;
      if (status) update.status = status;
      if (category) update.category = category;
      if (req.file) update.image = req.file.path;
      if (overview !== undefined) update.overview = overview;
      if (documents !== undefined) update.documents = typeof documents === 'string' ? JSON.parse(documents) : documents;
      if (gallery !== undefined) update.gallery = typeof gallery === 'string' ? JSON.parse(gallery) : gallery;
      if (aboutCity !== undefined) update.aboutCity = typeof aboutCity === 'string' ? JSON.parse(aboutCity) : aboutCity;
      if (aboutSector !== undefined) update.aboutSector = typeof aboutSector === 'string' ? JSON.parse(aboutSector) : aboutSector;
      if (reraNumber !== undefined) update.reraNumber = reraNumber;
      if (reraUrl !== undefined) update.reraUrl = reraUrl;
      if (isFeatured !== undefined) update.isFeatured = isFeatured === 'true' || isFeatured === true;
      if (isActive !== undefined) update.isActive = isActive !== 'false' && isActive !== false;

      const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!project) return response.notFound(res, { message: 'Project not found' });

      return response.ok(res, { message: 'Project updated successfully', data: project });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete project
  remove: async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return response.notFound(res, { message: 'Project not found' });
      return response.ok(res, { message: 'Project deleted successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
