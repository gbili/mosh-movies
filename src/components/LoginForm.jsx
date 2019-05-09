import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';

import Form from './Form';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class LoginForm extends Form {

  state = {
    data: {
      email: '',
      password: '',
    },
    errors: {
    }
  };

  schema = {
    email: Joi.string().required().min(5).max(9).label('Email Address'),
    password: Joi.string().required().label('Password'),
  };

  componentWillMount() {
    this.props.setTitle('Login');
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
          {this.renderInput({
            name: 'email',
            type: 'email',
            label: "Email Address",
            placeholder: "Enter email",
            help: "We'll never share your email with anyone else.",
          })}
          {this.renderInput({
            name: 'password',
            type: 'password',
            label: "Password",
            placeholder: "Crypt1K P455w0rd",
            help: "Use a-zA-Z0-9 and special chars",
          })}
          {this.renderButton('Login')}
        </form>
      </React.Fragment>
    );
  }
}

LoginForm.propTypes = propTypes;
export default LoginForm;
