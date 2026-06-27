'use strict';
const AboutPage = require('@models/AboutPage');
const response = require('@responses');

const getSingleton = async () => {
  let about = await AboutPage.findOne();
  if (!about) about = await AboutPage.create({});
  return about;
};

module.exports = {
  // Public: get about page data
  get: async (_req, res) => {
    try {
      const about = await getSingleton();
      return response.ok(res, { data: about });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update hero section
  updateHero: async (req, res) => {
    try {
      const { heading, subheading } = req.body;
      const about = await getSingleton();

      if (heading !== undefined) about.hero.heading = heading;
      if (subheading !== undefined) about.hero.subheading = subheading;

      await about.save();
      return response.ok(res, { message: 'Hero section updated', data: about.hero });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update story section
  updateStory: async (req, res) => {
    try {
      const { heading, description, highlights } = req.body;
      const about = await getSingleton();

      if (heading !== undefined) about.story.heading = heading;
      if (description !== undefined) about.story.description = description;
      if (highlights !== undefined) {
        about.story.highlights = typeof highlights === 'string' ? JSON.parse(highlights) : highlights;
      }
      if (req.file) about.story.image = req.file.path;
      else if (req.body.imageUrl) about.story.image = req.body.imageUrl;

      await about.save();
      return response.ok(res, { message: 'Story section updated', data: about.story });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update commitments
  updateCommitments: async (req, res) => {
    try {
      const { commitments } = req.body;
      const about = await getSingleton();

      if (commitments !== undefined) {
        about.commitments = typeof commitments === 'string' ? JSON.parse(commitments) : commitments;
      }

      await about.save();
      return response.ok(res, { message: 'Commitments updated', data: about.commitments });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update leaders
  updateLeaders: async (req, res) => {
    try {
      const { leaders } = req.body;
      const about = await getSingleton();

      if (leaders !== undefined) {
        about.leaders = typeof leaders === 'string' ? JSON.parse(leaders) : leaders;
      }

      // Handle uploaded leader images (fieldname: image_0, image_1, ...)
      if (req.files && req.files.length > 0) {
        req.files.forEach((file) => {
          const idx = parseInt(file.fieldname.replace('image_', ''));
          if (!isNaN(idx) && about.leaders[idx]) {
            about.leaders[idx].image = file.path;
          }
        });
      }

      await about.save();
      return response.ok(res, { message: 'Leaders updated', data: about.leaders });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
