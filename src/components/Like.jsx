import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Like = ({id, like, clickHandler}) => {

  return (
    <Button
      key={id}
      classes={[like ? 'success' : 'secondary']}
      value={ like ? 'Liked' : 'Like'}
      clickHandler={ clickHandler }
    />
  );

}

Like.propTypes = {
  id: PropTypes.string.isRequired,
  like: PropTypes.bool.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Like;
