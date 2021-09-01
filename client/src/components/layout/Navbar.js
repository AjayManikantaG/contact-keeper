import React from 'react';
import PropTypes from 'prop-types';

const Navbar = () => {
  return ()
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}

export default Navbar;