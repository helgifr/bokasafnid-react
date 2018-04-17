import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Profile extends Component {

  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <Helmet title="Síða mín" />
        <p>Notendasíða</p>
      </div>
    );
  }
}
