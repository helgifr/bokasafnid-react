import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DeleteButton.css';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class DeleteButton extends Component {

  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    onClick: () => {},
  }

  render() {
    const { children, className, onClick, bookId} = this.props;

    const classes = `delete-button ${className}`

    return (
      <button onClick={onClick} className={classes}>{children}</button>
    );
  }

}

