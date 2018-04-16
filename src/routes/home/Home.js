import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

class Home extends Component {

  render() {

    const { isAuthenticated } = this.props;
    let paragraph;
    if (isAuthenticated) {
      paragraph = (
      <React.Fragment>
        <p>
          Þú ert skráður notandi og getur því <Link to="/books/new">skráð bækur</Link> og breytt <Link to="/books">þeim sem til eru</Link>.
        </p>
        <p>
          Einnig getur þú skoðað <Link to="/users">aðra notendur</Link>.
        </p>
      </React.Fragment>
      );
    } else {
      paragraph = (
      <p>
        Til að njóta bókasafnsins til fullnustu mælum við með að <Link to="/login">skrá sig inn</Link>. Þangað til getur þú skoðað <Link to="/books">allar bækurnar.</Link>
      </p>
      );
    }
    /* todo birta mismunandi upplýsingar ef innskráður notandi eða ekki */

    return (
      <div>
        <h1>Velkomin á bókasafnið</h1>

        {paragraph}
      </div>
    );
  }
}

/* todo setja upp tengingu við redux til að vita stöðu notanda */
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(Home));
