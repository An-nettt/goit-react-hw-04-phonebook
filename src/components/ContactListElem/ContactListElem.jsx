import PropTypes from 'prop-types';
import { ContactListEl, Text, ButtonDel } from '../../styled';

const ContactListElem = ({ contactsEl, onDeleteContact }) => {
  return (
    <>
      <ContactListEl>
        <Text>
          {contactsEl.name} : {contactsEl.number}
        </Text>
        <ButtonDel type="button" onClick={() => onDeleteContact(contactsEl.id)}>
          Delete
        </ButtonDel>
      </ContactListEl>
    </>
  );
};

export default ContactListElem;

ContactListElem.propTypes = {
  contactsEl: PropTypes.arrayOf(PropTypes.string),
  onDeleteContact: PropTypes.func.isRequired,
};
