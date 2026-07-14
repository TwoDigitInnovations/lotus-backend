'use strict';
const Project = require('@models/Project');
const response = require('@responses');

function slugify(str) {
  return (
    (str || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'item'
  );
}

// Maps uploaded files (fieldnames like `galleryPhoto_0`, `galleryVideoThumb_1`) onto the
// parsed gallery JSON by array index.
function resolveGallery(gallery, files) {
  if (!gallery) return gallery;

  const photoFiles = {};
  const videoThumbFiles = {};
  const videoFiles = {};
  (files || []).forEach((f) => {
    const photoMatch = f.fieldname.match(/^galleryPhoto_(\d+)$/);
    if (photoMatch) photoFiles[photoMatch[1]] = f.path;
    const thumbMatch = f.fieldname.match(/^galleryVideoThumb_(\d+)$/);
    if (thumbMatch) videoThumbFiles[thumbMatch[1]] = f.path;
    const videoMatch = f.fieldname.match(/^galleryVideo_(\d+)$/);
    if (videoMatch) videoFiles[videoMatch[1]] = f.path;
  });

  return {
    photos: (gallery.photos || []).map((p, i) => ({ ...p, image: photoFiles[i] || p.image })),
    videos: (gallery.videos || []).map((v, i) => ({
      ...v,
      thumbnail: videoThumbFiles[i] || v.thumbnail,
      videoUrl: videoFiles[i] || v.videoUrl,
    })),
  };
}

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

  // Admin: get single project by id (includes inactive)
  adminGetById: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
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
        reraNumber, reraUrl, slug, metaTitle, metaDescription,
        isFeatured, isActive, mapEmbed,
      } = req.body;

      if (!name || !location || !category) {
        return response.badReq(res, { message: 'Name, location and category are required' });
      }

      const coverFile = (req.files || []).find((f) => f.fieldname === 'image');
      const locationImgFile = (req.files || []).find((f) => f.fieldname === 'locationImage');
      const parsedGallery = gallery ? (typeof gallery === 'string' ? JSON.parse(gallery) : gallery) : { photos: [], videos: [] };

      const project = await Project.create({
        name, location, propertySize, price, status, category,
        image: coverFile ? coverFile.path : undefined,
        locationImage: locationImgFile ? locationImgFile.path : undefined,
        mapEmbed,
        overview,
        documents: documents ? (typeof documents === 'string' ? JSON.parse(documents) : documents) : [],
        gallery: resolveGallery(parsedGallery, req.files),
        aboutCity: aboutCity ? (typeof aboutCity === 'string' ? JSON.parse(aboutCity) : aboutCity) : {},
        aboutSector: aboutSector ? (typeof aboutSector === 'string' ? JSON.parse(aboutSector) : aboutSector) : {},
        reraNumber, reraUrl,
        slug: slugify(slug || name),
        metaTitle, metaDescription,
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
        reraNumber, reraUrl, slug, metaTitle, metaDescription,
        isFeatured, isActive, mapEmbed,
      } = req.body;

      const coverFile = (req.files || []).find((f) => f.fieldname === 'image');
      const locationImgFile = (req.files || []).find((f) => f.fieldname === 'locationImage');

      const update = {};
      if (name) update.name = name;
      if (location) update.location = location;
      if (propertySize !== undefined) update.propertySize = propertySize;
      if (price !== undefined) update.price = price;
      if (status) update.status = status;
      if (category) update.category = category;
      if (coverFile) update.image = coverFile.path;
      if (locationImgFile) update.locationImage = locationImgFile.path;
      if (mapEmbed !== undefined) update.mapEmbed = mapEmbed;
      if (overview !== undefined) update.overview = overview;
      if (documents !== undefined) update.documents = typeof documents === 'string' ? JSON.parse(documents) : documents;
      if (gallery !== undefined) {
        const parsedGallery = typeof gallery === 'string' ? JSON.parse(gallery) : gallery;
        update.gallery = resolveGallery(parsedGallery, req.files);
      }
      if (aboutCity !== undefined) update.aboutCity = typeof aboutCity === 'string' ? JSON.parse(aboutCity) : aboutCity;
      if (aboutSector !== undefined) update.aboutSector = typeof aboutSector === 'string' ? JSON.parse(aboutSector) : aboutSector;
      if (reraNumber !== undefined) update.reraNumber = reraNumber;
      if (reraUrl !== undefined) update.reraUrl = reraUrl;
      if (slug !== undefined) update.slug = slugify(slug || name);
      if (metaTitle !== undefined) update.metaTitle = metaTitle;
      if (metaDescription !== undefined) update.metaDescription = metaDescription;
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
