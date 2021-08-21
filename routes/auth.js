const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMiddleware = require('../middleware/auth');

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({
        status: 404,
        msg: 'User not found... Please check with support team',
      });
    res.status(200).json({ status: 200, payload: user });
  } catch (err) {
    res.status(500).json({ status: 500, msg: err.message });
  }
});

// @route     POST api/auth
// @desc      Auth user and get token
// @access    Public
router.post(
  '/',
  [
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Please enter valid password').exists(),
  ],
  async (req, res) => {
    // Validate the request
    const errors = await validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors);

    const { email, password } = req.body;
    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user)
        return res.status(404).json({
          status: 404,
          payload: 'User not found. Please sign up and login...',
        });

      // If user exists, compare the passwords...
      console.log(user);
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(404).json({
          status: 404,
          payload: { msg: 'Please check your credentials...' },
        });

      // After login is successful, send the token
      let payload = {
        id: user.id,
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(200).send(token);
        }
      );
    } catch (e) {
      res.status(500).send(e.message);
    }
  }
);

module.exports = router;
