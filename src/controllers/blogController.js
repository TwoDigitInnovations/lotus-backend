'use strict';
const Blog = require('@models/Blog');
const response = require('@responses');
const { upload } = require('@services/fileUpload');

module.exports = {
  // Public: get all published blogs
  getAll: async (req, res) => {
    try {
      let { page = 1, limit = 10, search } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const filter = { isPublished: true };
      if (search) filter.title = { $regex: search, $options: 'i' };

      const [blogs, total] = await Promise.all([
        Blog.find(filter).sort('-publishedAt').skip((page - 1) * limit).limit(limit),
        Blog.countDocuments(filter),
      ]);

      return response.ok(res, {
        data: blogs,
        pagination: { total, totalPages: Math.ceil(total / limit), currentPage: page, limit },
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Public: get single blog by slug
  getBySlug: async (req, res) => {
    try {
      const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
      if (!blog) return response.notFound(res, { message: 'Blog not found' });
      return response.ok(res, { data: blog });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all blogs (including drafts)
  adminGetAll: async (req, res) => {
    try {
      let { page = 1, limit = 10, isPublished } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (isPublished !== undefined) filter.isPublished = isPublished === 'true';

      const [blogs, total] = await Promise.all([
        Blog.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
        Blog.countDocuments(filter),
      ]);

      return response.ok(res, {
        data: blogs,
        pagination: { total, totalPages: Math.ceil(total / limit), currentPage: page, limit },
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: create blog
  create: async (req, res) => {
    try {
      const { title, slug, description, content, isPublished } = req.body;
      if (!title || !slug) return response.badReq(res, { message: 'Title and slug are required' });

      const exists = await Blog.findOne({ slug });
      if (exists) return response.conflict(res, { message: 'Slug already exists' });

      const blog = await Blog.create({
        title,
        slug,
        description,
        content: Array.isArray(content) ? content : content ? [content] : [],
        image: req.file ? req.file.path : undefined,
        isPublished: isPublished === 'true' || isPublished === true,
      });

      return response.created(res, { message: 'Blog created successfully', data: blog });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update blog
  update: async (req, res) => {
    try {
      const { title, slug, description, content, isPublished } = req.body;
      const update = {};

      if (title) update.title = title;
      if (slug) {
        const exists = await Blog.findOne({ slug, _id: { $ne: req.params.id } });
        if (exists) return response.conflict(res, { message: 'Slug already exists' });
        update.slug = slug;
      }
      if (description !== undefined) update.description = description;
      if (content !== undefined) update.content = Array.isArray(content) ? content : [content];
      if (req.file) update.image = req.file.path;
      if (isPublished !== undefined) update.isPublished = isPublished === 'true' || isPublished === true;

      const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
      if (!blog) return response.notFound(res, { message: 'Blog not found' });

      return response.ok(res, { message: 'Blog updated successfully', data: blog });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete blog
  remove: async (req, res) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id);
      if (!blog) return response.notFound(res, { message: 'Blog not found' });
      return response.ok(res, { message: 'Blog deleted successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
