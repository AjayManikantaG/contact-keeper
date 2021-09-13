import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { current, addContact, clearCurrent, updateContact } = contactContext;

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'professional',
  });

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'professional',
      });
    }
  }, [contactContext, current]);

  const { name, email, phone, type } = contact;

  const onChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const clearAll = () => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
      console.log(contact);
      clearCurrent();
    }
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'professional',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current === null ? 'Add Contact' : 'Edit Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Enter your email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='phone'
        placeholder='Enter your phone no.'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        onChange={onChange}
        checked={type === 'personal'}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type !== 'personal'}
        onChange={onChange}
      />{' '}
      Professional{' '}
      <div>
        <input
          type='submit'
          value={current === null ? 'Add Contact' : 'Edit Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          {' '}
          <button onClick={clearAll} className='btn btn-light btn-block'>
            Clear
          </button>{' '}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
