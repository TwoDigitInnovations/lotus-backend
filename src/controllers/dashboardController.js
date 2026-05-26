'use strict';
const Contact = require('@models/Contact');
const Blog = require('@models/Blog');
const Gallery = require('@models/Gallery');
const Project = require('@models/Project');
const response = require('@responses');

module.exports = {
  stats: async (req, res) => {
    try {
      const [
        contactTotal,
        contactNew,
        contactRead,
        contactReplied,
        blogTotal,
        blogPublished,
        galleryTotal,
        galleryPhotos,
        galleryVideos,
        galleryActive,
        projectTotal,
        projectActive,
        projectFeatured,
        projectResidential,
        projectUnderConstruction,
        recentContacts,
        recentBlogs,
        recentProjects,
      ] = await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ status: 'new' }),
        Contact.countDocuments({ status: 'read' }),
        Contact.countDocuments({ status: 'replied' }),
        Blog.countDocuments(),
        Blog.countDocuments({ isPublished: true }),
        Gallery.countDocuments(),
        Gallery.countDocuments({ type: 'photo' }),
        Gallery.countDocuments({ type: 'video' }),
        Gallery.countDocuments({ isActive: true }),
        Project.countDocuments(),
        Project.countDocuments({ isActive: true }),
        Project.countDocuments({ isFeatured: true }),
        Project.countDocuments({ category: 'residential' }),
        Project.countDocuments({ status: 'Under Construction' }),
        Contact.find().sort('-createdAt').limit(6).select('name phone subject status createdAt'),
        Blog.find().sort('-createdAt').limit(5).select('title slug isPublished publishedAt createdAt image'),
        Project.find().sort('-createdAt').limit(4).select('name location category status image isFeatured isActive'),
      ]);

      return response.ok(res, {
        stats: {
          contacts: {
            total: contactTotal,
            new: contactNew,
            read: contactRead,
            replied: contactReplied,
          },
          blogs: {
            total: blogTotal,
            published: blogPublished,
            drafts: blogTotal - blogPublished,
          },
          gallery: {
            total: galleryTotal,
            photos: galleryPhotos,
            videos: galleryVideos,
            active: galleryActive,
          },
          projects: {
            total: projectTotal,
            active: projectActive,
            featured: projectFeatured,
            residential: projectResidential,
            commercial: projectTotal - projectResidential,
            underConstruction: projectUnderConstruction,
            readyToMove: projectActive - projectUnderConstruction < 0 ? 0 : projectTotal - projectUnderConstruction,
          },
        },
        recentContacts,
        recentBlogs,
        recentProjects,
      });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
