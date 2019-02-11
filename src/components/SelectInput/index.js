import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

const { Option } = Select;

/**
 * Render Select input wrapper on top of antd select input
 *
 * @function
 * @name SelectInput
 *
 * @returns {ReactElement}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const SelectInput = ({ options, ...props }) => (
  <Select {...props}>
    {options.map(option => (
      <Option key={option} value={option}>
        {option}
      </Option>
    ))}
  </Select>
);

/* props validation */
SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string }))
    .isRequired,
  optionValue: PropTypes.string.isRequired,
  optionLabel: PropTypes.string.isRequired,
};

export default SelectInput;