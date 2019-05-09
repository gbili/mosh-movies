import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';

import FormGroup from './FormGroup';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class Form extends Component {

  state = {
    data: {},
    errors: {},
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    const errors = {};
    Object.keys(this.state.data).map(name => {
      const input = { name: name, value:  this.state.data[name] };
      const errorMessage = this.validateSingle(input);
      if (errorMessage) {
        errors[name] = errorMessage;
      }
      return null;
    });
    return Object.keys(errors).length > 0 ? errors : null;
  }

  validateSingle({ name, value }) {
    const schema = { [name]: this.schema[name] };
    const input = { [name]: value };
    const { error } = Joi.validate(input, schema, { abortEarly: false });
    return error ? error.details[0].message : null;
  }

  handleChange({ currentTarget: input }) {
    const data = {...this.state.data};
    data[input.name] = input.value;

    const errorMessage = this.validateSingle(input);
    const errors = {...this.state.errors};
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    this.setState({ data, errors });
  }

  handleSubmit(e) {
    e.preventDefault();

    const errors = this.validate();
    errors && this.setState({errors});

    if (errors) {
      this.onSubmitHasErrors(this.state.errors);
      return;
    }
    this.onSubmitIsValid(this.state.data);
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderSelect({ type, name, label, placeholder, help, elements, selectOptions, ...rest }) {
    const { data, errors } = this.state;
    const items = elements && elements.constructor === Array && [...elements];
    if (selectOptions && typeof selectOptions.nothing !== 'undefined'
      && null !== elements && -1 === elements.indexOf(selectOptions.nothing)
    ) {
      items.unshift(selectOptions.nothing);
    }

    return (
      <FormGroup
        name={name}
        label={label}
        help={help}
        error={typeof errors[name] !== "undefined" ? errors[name] : null}
      >
        <select
          id={name}
          name={name}
          className="custom-select"
          onChange={this.handleChange}
          defaultValue={(data[name] !== '' && data[name])
              || (selectOptions && selectOptions.selected)}
        >
          {items.map(el => {
            const isNothingElement = (typeof selectOptions.nothing !== 'undefined'
              && selectOptions.nothing === el)
            let displayText = (isNothingElement && el) || el.name;
            let key = (isNothingElement && 1) || el.id;
            return (
              <option
                key={key}
                value={(!isNothingElement && displayText) || null}
              >
                {displayText}
              </option>
            );
          })}
        </select>
      </FormGroup>
    );
  }

  renderInput({ type, name, label, placeholder, help, elements, selectOptions, ...rest }) {
    const { data, errors } = this.state;
    return (
      <FormGroup
        name={name}
        label={label}
        help={help}
        error={typeof errors[name] !== "undefined" ? errors[name] : null}
      >
        <input
          id={name}
          name={name}
          value={data[name]}
          onChange={this.handleChange}
          type={type}
          className="form-control"
          placeholder={placeholder}
          aria-describedby={name + 'Help'}
          {...rest}
        />
      </FormGroup>
    );
  }

}

Form.propTypes = propTypes;

export default Form;
