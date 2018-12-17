import React from 'react';
import classnames from 'classnames';

const Button = (props) => {
  const { primary, danger, ...other } = props;

  // don't create your classes with string constructs
  // let className = 'btn btn-default';
  // if (danger) {
  //   className = 'btn btn-danger';
  // }
  // if (primary) {
  //   className = 'btn btn-primary';
  // }

  const buttonClasses = classnames({
    btn: true,
    'btn-default': !danger && !primary,
    'btn-danger': danger,
    'btn-primary': primary,
  });

  return <button className={buttonClasses} {...other} />;
};

export default Button;
