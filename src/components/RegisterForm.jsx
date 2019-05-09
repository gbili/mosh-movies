import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';

import Form from './Form';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class RegisterForm extends Form {

  state = {
    data: {
      email: '',
      password: '',
      name: '',
    },
    errors: {
    }
  };

  schema = {
    email: Joi.string().required().min(5).max(9).label('Email Address'),
    password: Joi.string().required().label('Password'),
    name: Joi.string().required().min(5).max(9).label('Name'),
  };

  componentWillMount() {
    this.props.setTitle('Register');
  }

  onSubmitIsValid() {
    console.log('submit is valid', this.state.data);
  }
  onSubmitHasErrors() {
    console.log('submit has errors', this.state.errors);
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput(
            'email',
            'email',
            "Enter email",
            "Email Address",
            "We'll never share your email with anyone else."
          )}
          {this.renderInput(
            'password',
            'password',
            "Password",
            "Crypt1K P455w0rd",
            "Use a-zA-Z0-9 and special chars"
          )}
          {this.renderInput(
            'name',
            'text',
            "Name",
            "John",
            "Your firstname"
          )}
          {this.renderButton('Register')}
        </form>
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = propTypes;
export default RegisterForm;
