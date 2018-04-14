import React, { Component } from 'react';

export default class Profile extends Component {

  render() {
    const { authenticated } = this.props;
    if (authenticated) {
      return (
        <div>
          <p>Notendasíða</p>
        </div>
      );
    }
    return (
      <p>no no no</p>
    );
  }
}
