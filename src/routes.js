const authRoutes = require('@routes/authRoutes');
const contactRoutes = require('@routes/contactRoutes');
const blogRoutes = require('@routes/blogRoutes');
const galleryRoutes = require('@routes/galleryRoutes');
const projectRoutes = require('@routes/projectRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/contact', contactRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/gallery', galleryRoutes);
  app.use('/projects', projectRoutes);
};
