import React from 'react';
import { Field } from './Field';

const TextInput = ({
  type = 'text',
  id,
  label,
  error,
  value,
  onChange,
  className,
  ...props
}) => (
  <Field id={id} label={label} error={error}>
    <input
      id={id}
      className="text-input"
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </Field>
);

export default TextInput;
