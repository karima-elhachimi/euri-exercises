import React from 'react';
import { Field } from './Field';

const TextArea = ({
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
    <textarea
      id={id}
      className="text-input"
      type={type}
      value={value}
      onChange={onChange}
      {...props}
    />
  </Field>
);

export default TextArea;
