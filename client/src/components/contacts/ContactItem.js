import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

export const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent, current } = contactContext;

  const { name, id, email, phone, type } = contact;

  function deleteContactItem() {
    if (contact.id === current.id) {
      clearCurrent();
    }
    deleteContact(id);
  }

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'></i>
            {' ' + email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i>
            {' ' + phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-sm btn-dark'
          onClick={() => setCurrent(contact)}
        >
          {' '}
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={deleteContactItem}>
          {' '}
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
