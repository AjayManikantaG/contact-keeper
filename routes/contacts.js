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
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'Please enter valid email').isEmail(),
    body('phone', 'Please enter valid 10 digit phone number').isLength(10),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }

    try {
      const user = req.user.id;
      const { name, email, phone, type } = req.body;
      const contact = { user, name, email, phone };
      console.log(type);
      if (type !== undefined) contact.type = type;

      const isInserted = await Contact.insertMany(contact);
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
router.put('/:id', (req, res) => {
  res.send('update contact..');
});

// @route     DELETE api/contacts
// @desc      Delete existing contact
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('delete contact..');
});

module.exports = router;
