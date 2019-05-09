import React from 'react';
import PropTypes from 'prop-types';


const Button = ({classes, value, clickHandler, disabled, id}) => {

  if (typeof classes === 'undefined') {
    classes = ['primary'];
  }

  return (
    <button
      key={ id }
      onClick={ clickHandler }
      type='button'
      className={ `btn ${classes.map(cl => `btn-${ cl }`).join(' ')}` }
      disabled={ disabled }
    >
      { value }
    </button>
  );

}

Button.propTypes = {
  classes: PropTypes.array,
  value: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
};

export default Button;
