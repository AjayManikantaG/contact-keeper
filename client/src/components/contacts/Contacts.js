import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0 && filtered === null) {
    return <h4>Please add contacts</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((contact) => (
            <ContactItem key={contact.id} contact={contact} />
          ))
        : contacts.map((contact, index) => (
            <ContactItem key={index} contact={contact} />
          ))}
    </Fragment>
  );
};

export default Contacts;
