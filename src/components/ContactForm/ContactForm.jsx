import { Component } from 'react';
import PropTypes from 'prop-types';
import { PhonebookForm, Text, Input, Button } from '../../styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  addContact = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    event.currentTarget.reset();
  };

  render() {
    return (
      <PhonebookForm onSubmit={this.handleSubmit}>
        <Text>Name</Text>
        <Input
          type="text"
          name="name"
          onChange={this.addContact}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <Text>Number</Text>
        <Input
          type="tel"
          name="number"
          onChange={this.addContact}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <Button type="submit">Add contact</Button>
      </PhonebookForm>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
