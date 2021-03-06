import React, { useState, useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types';

import { ContactForm } from './components/contactform';
import { ContactList } from './components/contactlist';
import { Filter } from './components/filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.getItem('contacts') &&
      setContacts(JSON.parse(localStorage.getItem('contacts')));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSubmitHandler(data) {
    setContacts(prevContacts => [...prevContacts, data]);
  }

  function getVisibleContacts() {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

  function deleteContact(contactId) {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  }

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} onSubmit={formSubmitHandler} />
      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        deleteContact={deleteContact}
      />
    </>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  filter: PropTypes.string,
};

export { App };
