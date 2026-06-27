'use strict';
const SiteSettings = require('@models/SiteSettings');
const response = require('@responses');
// fileUpload imported only for multer middleware; not used directly here

const getSingleton = async () => {
  let settings = await SiteSettings.findOne();
  if (!settings) settings = await SiteSettings.create({});
  return settings;
};

module.exports = {
  // Public: get all site settings
  get: async (_req, res) => {
    try {
      const settings = await getSingleton();
      return response.ok(res, { data: settings });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update welcome section
  updateWelcome: async (req, res) => {
    try {
      const { heading, subheading, description } = req.body;
      const settings = await getSingleton();

      if (heading !== undefined) settings.welcome.heading = heading;
      if (subheading !== undefined) settings.welcome.subheading = subheading;
      if (description !== undefined) settings.welcome.description = description;

      if (req.files && req.files.length > 0) {
        settings.welcome.images = req.files.map((f) => f.path);
      } else if (req.body.imageUrls) {
        const urls = typeof req.body.imageUrls === 'string' ? JSON.parse(req.body.imageUrls) : req.body.imageUrls;
        if (Array.isArray(urls) && urls.length > 0) settings.welcome.images = urls;
      }

      await settings.save();
      return response.ok(res, { message: 'Welcome section updated', data: settings.welcome });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update why choose us
  updateWhyChooseUs: async (req, res) => {
    try {
      const { heading, features } = req.body;
      const settings = await getSingleton();

      if (heading !== undefined) settings.whyChooseUs.heading = heading;
      if (features !== undefined) {
        settings.whyChooseUs.features = typeof features === 'string' ? JSON.parse(features) : features;
      }

      await settings.save();
      return response.ok(res, { message: 'Why Choose Us updated', data: settings.whyChooseUs });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update testimonials
  updateTestimonials: async (req, res) => {
    try {
      const { testimonials } = req.body;
      const settings = await getSingleton();

      if (testimonials !== undefined) {
        settings.testimonials = typeof testimonials === 'string' ? JSON.parse(testimonials) : testimonials;
      }

      // Handle uploaded testimonial images
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const idx = parseInt(file.fieldname.replace('image_', ''));
          if (!isNaN(idx) && settings.testimonials[idx]) {
            settings.testimonials[idx].image = file.path;
          }
        });
      }

      await settings.save();
      return response.ok(res, { message: 'Testimonials updated', data: settings.testimonials });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update footer
  updateFooter: async (req, res) => {
    try {
      const { description, phone, email, address, whatsapp, socialLinks } = req.body;
      const settings = await getSingleton();

      if (description !== undefined) settings.footer.description = description;
      if (phone !== undefined) settings.footer.phone = phone;
      if (email !== undefined) settings.footer.email = email;
      if (address !== undefined) settings.footer.address = address;
      if (whatsapp !== undefined) settings.footer.whatsapp = whatsapp;
      if (socialLinks !== undefined) {
        const links = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
        settings.footer.socialLinks = { ...settings.footer.socialLinks.toObject?.() ?? settings.footer.socialLinks, ...links };
      }

      await settings.save();
      return response.ok(res, { message: 'Footer updated', data: settings.footer });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update privacy policy
  updatePrivacyPolicy: async (req, res) => {
    try {
      const { content } = req.body;
      const settings = await getSingleton();
      settings.privacyPolicy = content || '';
      await settings.save();
      return response.ok(res, { message: 'Privacy policy updated', data: { privacyPolicy: settings.privacyPolicy } });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update terms of service
  updateTerms: async (req, res) => {
    try {
      const { content } = req.body;
      const settings = await getSingleton();
      settings.termsOfService = content || '';
      await settings.save();
      return response.ok(res, { message: 'Terms of service updated', data: { termsOfService: settings.termsOfService } });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
