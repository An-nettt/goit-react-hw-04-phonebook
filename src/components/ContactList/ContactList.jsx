import PropTypes from 'prop-types';
import ContactListElem from '../ContactListElem';
import { ContactListWrapper } from '../../styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ContactListWrapper>
      {contacts.map(({ id, name, number }) => (
        <ContactListElem
          contactsEl={{ id, name, number }}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ContactListWrapper>
  );
};

export default ContactList;

ContactList.propTypes = {
  contactsArrayOf: PropTypes.arrayOf(PropTypes.string),
  onDeleteContact: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};
