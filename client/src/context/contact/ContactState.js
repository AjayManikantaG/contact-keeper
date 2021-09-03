import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ajay Manikanta',
        email: 'ajay@email.com',
        phone: '7981263843',
        type: 'Personal',
      },
      {
        id: 2,
        name: 'Vijay Manikanta',
        email: 'Vijay@email.com',
        phone: '7981263883',
        type: 'Personal',
      },
      {
        id: 1,
        name: 'Yogi Manikanta',
        email: 'Yogi@email.com',
        phone: '7981263853',
        type: 'Professional',
      },
    ],
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact

  // Delete Contact

  // Set Current state

  // Clear Current state

  // Update Contact

  // Filter contacts

  // Clear Filter

  return (
    <ContactContext.Provider value={{ contacts: state.contacts }}>
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
