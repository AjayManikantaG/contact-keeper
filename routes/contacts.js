const express = require('express');
const router = express.Router();

// @route     GET api/contacts
// @desc      Get all user contacts
// @access    Private
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

// @route     POST api/contacts
// @desc      Add new contacts
// @access    Private
router.post('/', (req, res) => {
  res.send('Add new contact..');
});

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
