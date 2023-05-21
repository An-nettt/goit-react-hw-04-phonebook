import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { Wrapper, Title, ContactsTitle } from '../styled';

const useLocalStorage = key => {
  useEffect(() => {
    window.localStorage.setItem('key', JSON.stringify(key));
  }, [key]);
};

export default function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const addToContacts = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const auditContacts = contacts.filter(contact =>
      contact.name.includes(newContact.name)
    );

    if (auditContacts.length === 0) {
      setContacts(() => [newContact, ...contacts]);
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

  useLocalStorage(contacts);

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(() => contacts.filter(contact => contact.id !== id));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Wrapper>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={addToContacts} />

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contactsList={getVisibleContacts}
        onDeleteContact={deleteContact}
      />
    </Wrapper>
  );
}
// export default class App2 extends Component {

//
// changeFilter = event => {
//   this.setState({ filter: event.currentTarget.value });
// };

// getVisibleContacts = () => {
//   const { contacts, filter } = this.state;
//   const normalizedFilter = filter.toLowerCase();

//   return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(normalizedFilter)
//   );
// };

// deleteContact = id => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== id),
//   }));
// };

// componentDidUpdate(prepProp, prepState) {
//   if (this.state.contacts !== prepState.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }
// }

// componentDidMount() {
//   const localStorageContacts = localStorage.getItem('contacts');
//   const newContacts = JSON.parse(localStorageContacts);

//   if (newContacts) {
//     this.setState({ contacts: newContacts });
//   }
// }

// render() {
//   const filterContacts = this.getVisibleContacts();

// }
// }
