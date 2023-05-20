import PropTypes from 'prop-types';

import { FilterWrapper, Text, Input } from '../../styled';

const Filter = ({ value, onChange }) => {
  return (
    <FilterWrapper>
      <Text>Find contacts by name</Text>
      <Input value={value} onChange={onChange}></Input>
    </FilterWrapper>
  );
};

export default Filter;

Filter.propTypes = {
  value: PropTypes.string.isRequired,
};
