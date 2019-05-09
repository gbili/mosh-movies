import React from 'react';
import PropTypes from 'prop-types';

function FormGroup({ name, label, help, error, children}) {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      {children}
      <small id={name + 'Help'} className="form-text text-muted">
        {help}
      </small>
      {(error && (
        <div className="alert alert-danger">{error}</div>
      )) || null}
    </div>
  );
}

FormGroup.propTypes = {
  name: PropTypes.string.isRequired, 
  label: PropTypes.string,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  error: PropTypes.string,
  step: PropTypes.number
};

export default FormGroup;
