'use strict';
const Contact = require('@models/Contact');
const response = require('@responses');

module.exports = {
  // Public: submit contact form
  submit: async (req, res) => {
    try {
      const { name, phone, subject, message } = req.body;
      if (!name || !phone) return response.badReq(res, { message: 'Name and phone are required' });

      const contact = await Contact.create({ name, phone, subject, message });
      return response.created(res, { message: 'Message submitted successfully', data: contact });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get all contacts
  getAll: async (req, res) => {
    try {
      let { page = 1, limit = 20, status } = req.query;
      page = parseInt(page);
      limit = parseInt(limit);

      const filter = {};
      if (status) filter.status = status;

      const [contacts, total] = await Promise.all([
        Contact.find(filter).sort('-createdAt').skip((page - 1) * limit).limit(limit),
        Contact.countDocuments(filter),
      ]);

      return response.ok(res, {
        data: contacts,
        pagination: { total, totalPages: Math.ceil(total / limit), currentPage: page, limit },
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: get single contact
  getById: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) return response.notFound(res, { message: 'Contact not found' });
      return response.ok(res, { data: contact });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: update status
  updateStatus: async (req, res) => {
    try {
      const { status } = req.body;
      const contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true, runValidators: true },
      );
      if (!contact) return response.notFound(res, { message: 'Contact not found' });
      return response.ok(res, { message: 'Status updated', data: contact });
    } catch (error) {
      return response.error(res, error);
    }
  },

  // Admin: delete contact
  remove: async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) return response.notFound(res, { message: 'Contact not found' });
      return response.ok(res, { message: 'Contact deleted successfully' });
    } catch (error) {
      return response.error(res, error);
    }
  },
};
