import { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

import { Wrapper, Title, ContactsTitle } from './styled';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addToContacts = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const auditContacts = this.state.contacts.filter((contact) =>
      contact.name.includes(newContact.name)
    );

    if (auditContacts.length === 0) {
      this.setState((prevState) => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

  changeFilter = (event) => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  componentDidUpdate(prepProp, prepState) {
    if (this.state.contacts !== prepState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const localStorageContacts = localStorage.getItem('contacts');
    const newContacts = JSON.parse(localStorageContacts);

    if (newContacts) {
      this.setState({ contacts: newContacts });
    }
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.getVisibleContacts();
    return (
      <Wrapper>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addToContacts} />

        <ContactsTitle>Contacts</ContactsTitle>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Wrapper>
    );
  }
}
