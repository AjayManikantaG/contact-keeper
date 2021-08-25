const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route     GET api/contacts
// @desc      Get all user contacts
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ statusCode: 500, msg: error.message });
  }
});

// @route     POST api/contacts
// @desc      Add new contacts
// @access    Private
router.post(
  '/',
  [
    authMiddleware,
    [
      body('name', 'Please add a name').not().isEmpty(),
      body('email', 'Please enter valid email').isEmail(),
      body('phone', 'Please enter valid 10 digit phone number').isLength(10),
    ],
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    const user = req.user.id;
    const { name, email, phone, type } = req.body;

    try {
      const contact = { user, name, email, phone };
      console.log(type);
      if (type !== undefined) contact.type = type;

      const newContact = new Contact(contact);
      const isInserted = await newContact.save();
      console.log(isInserted);
      res.status(200).send('Record inserted sucessfully...');
    } catch (err) {
      res.status(500).json({ statusCode: 500, msg: err.message });
    }
  }
);

// @route     PUT api/contacts
// @desc      Update existing contact
// @access    Private
router.put(
  '/:id',
  [
    authMiddleware,
    [
      body('name', 'Please add a name').not().isEmpty(),
      body('email', 'Please enter valid email').isEmail(),
      body('phone', 'Please enter valid 10 digit phone number').isLength(10),
    ],
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    const { name, phone, email, type } = req.body;

    // Build contact object
    const contactFields = {};
    if (name) contactFields.name = name;
    if (phone) contactFields.phone = phone;
    if (email) contactFields.email = email;
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);
      if (!contact)
        return res
          .status(404)
          .json({ statusCode: 404, msg: 'Contact not found...' });

      // Make sure user owns contact
      if (contact.user.toString() !== req.user.id)
        return res.status(401).json({ statusCode: 401, msg: 'Not authorized' });

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        {
          $set: contactFields,
        },
        { new: true }
      );

      res.status(200).json({
        statusCode: 200,
        msg: `contact updated successfully... ${contact}`,
      });
    } catch (error) {
      res.status(500).json({ statusCode: 500, msg: error.message });
    }
  }
);

// @route     DELETE api/contacts
// @desc      Delete existing contact
// @access    Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact)
      return res
        .status(404)
        .json({ statusCode: 404, msg: 'No such contact exists...' });

    if (contact.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ statusCode: 401, msg: 'User unauthorised' });

    contact = await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({ statusCode: 200, msg: contact });
  } catch (err) {
    res.status(500).json({ statusCode: 500, msg: err.message });
  }
});

module.exports = router;
