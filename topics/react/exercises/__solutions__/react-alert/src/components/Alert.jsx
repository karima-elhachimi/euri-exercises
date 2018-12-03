import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

class Alert extends Component {
  render() {
    console.log(this.props);
    const { children, type, onClose } = this.props;
    const alertClasses = classNames({ alert: true, [`alert-${type}`]: true });
    return (
      <div className={alertClasses}>
        {onClose && (
          <a
            role="button"
            tabIndex="0"
            className="close"
            data-dismiss="alert"
            aria-label="close"
            onClick={onClose}
          >
            &times;
          </a>
        )}
        {children}
      </div>
    );
  }
}

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  type: PropTypes.string,
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
