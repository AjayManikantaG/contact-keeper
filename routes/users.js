const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    body('name', 'Please add a name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please include a password with 6 or more characters..'
    ).isLength({ min: 6, max: 14 }),
  ],
  async (req, res) => {
    // Validate requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      // Find if the user exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).send('User already exists...');

      // Create new user with encrypted password
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Create JWT token and send it to user
      const token = jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) return res.status(500).send(err.message);
          res.status(200).send({ status: 200, body: token });
        }
      );
    } catch (e) {
      res.status(500).send({
        status: 500,
        body: { msg: `Internal server error: ${e.message}` },
      });
    }
  }
);

module.exports = router;
