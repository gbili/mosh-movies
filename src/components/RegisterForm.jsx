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

  async onSubmitIsValid() {
    await this.props.createUser(this.state.data);
    this.props.history.replace('/');
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
            label: 'Email',
            placeholder: 'john@example.com',
            help: `We'll never share your email with anyone else.`,
          })}
          {this.renderInput({
            name: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'H2k1E9.#32Ff899i',
            help: 'Use a-zA-Z0-9 and special chars',
          })}
          {this.renderInput({
            name: 'name',
            type: 'text',
            label: 'Name',
            placeholder: 'John',
            help: 'Your name',
          })}
          {this.renderButton('Register')}
        </form>
      </React.Fragment>
    );
  }
}

RegisterForm.propTypes = propTypes;
export default RegisterForm;
