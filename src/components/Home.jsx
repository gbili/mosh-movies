import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class Home extends Component {

  componentWillMount() {
    const {setTitle} = this.props;
    setTitle('Home');
  }

  render() {
    return (
      <p>This is the home content</p>
    );
  }
}

Home.propTypes = propTypes;

export default Home;
