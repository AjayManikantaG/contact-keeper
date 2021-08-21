const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from the headers
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token)
    return res
      .status(401)
      .json({ status: 401, msg: 'No Token - Authorization denied' });

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ status: 401, msg: 'Token is not valid...' });
  }
};
