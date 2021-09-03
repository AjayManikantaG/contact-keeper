import React from 'react';

export const ContactItem = ({ contact }) => {
  const { name, id, email, phone, type } = contact;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        ></span>
      </h3>
    </div>
  );
};

export default ContactItem;
