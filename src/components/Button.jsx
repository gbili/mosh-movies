import React from 'react';
import PropTypes from 'prop-types';


const Button = ({classes, value, clickHandler, disabled, id}) => {

  return (
    <button
      key={ id }
      onClick={ clickHandler }
      type='button'
      className={ `btn ${classes.map(cl => `btn-${ cl }`)}` }
      disabled={ disabled }
    >
      { value }
    </button>
  );

}

Button.propTypes = {
  classes: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

export default Button;
