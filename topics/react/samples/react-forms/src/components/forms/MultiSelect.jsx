/* eslint-disable no-extra-boolean-cast */

import React from 'react';
import Select from 'react-select';
import { Field } from './Field';

class MultiSelect extends React.Component {
  handleChange = value => {
    const { name, id, onChange } = this.props;
    const key = name || id;
    onChange(key, value);
  };

  handleBlur = () => {
    const { name, id, onBlur } = this.props;
    const key = name || id;
    onBlur(key, true);
  };

  render() {
    const {
      id,
      label,
      error,
      value,
      onChange,
      onBlur,
      options,
      ...props
    } = this.props;
    return (
      <Field id={id} label={label} error={error}>
        <Select
          id={id}
          options={options}
          inputClassName={!!error ? 'input' : 'input error'}
          multi
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={value}
          {...props}
        />
      </Field>
    );
  }
}

export default MultiSelect;
