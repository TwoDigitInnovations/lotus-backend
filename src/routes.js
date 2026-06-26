const authRoutes = require('@routes/authRoutes');
const contactRoutes = require('@routes/contactRoutes');
const blogRoutes = require('@routes/blogRoutes');
const galleryRoutes = require('@routes/galleryRoutes');
const projectRoutes = require('@routes/projectRoutes');
const dashboardRoutes = require('@routes/dashboardRoutes');
const heroBannerRoutes = require('@routes/heroBannerRoutes');
const siteSettingsRoutes = require('@routes/siteSettingsRoutes');
const aboutPageRoutes = require('@routes/aboutPageRoutes');

module.exports = (app) => {
  app.use('/auth', authRoutes);
  app.use('/contact', contactRoutes);
  app.use('/blogs', blogRoutes);
  app.use('/gallery', galleryRoutes);
  app.use('/projects', projectRoutes);
  app.use('/dashboard', dashboardRoutes);
  app.use('/hero-banners', heroBannerRoutes);
  app.use('/site-settings', siteSettingsRoutes);
  app.use('/about-page', aboutPageRoutes);
};
