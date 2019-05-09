import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import Form from './Form';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

class MovieForm extends Form {

  schema = {
    id: Joi.number(),
    title: Joi.string().required().min(5).max(90).label('Title'),
    genre: Joi.string().required().label('Genre'),
    stock: Joi.number().required().min(0).label('Stock'),
    rate: Joi.number().integer().min(1).max(10).required().label('Rate'),
  };

  constructor(props) {
    super(props)
    let {history, match, getMovie} = props;
    let movie = { title: '', genre: '', stock: '', rate: '' };
    if (typeof match.params.id !== 'undefined') {
      movie = getMovie(match.params.id);
      if (!movie) {
        return history.replace('/404');
      }
      movie = this.mapToViewModel(movie);
    }
    this.state = {data: movie, errors: {}};
  }

  componentWillMount() {
    this.props.setTitle('New Movie');
  }

  onSubmitIsValid() {
    let {match, getMovie} = this.props;
    const {title, genre, stock, rate} = this.state.data;
    const isNewMovie = (typeof match.params.id === 'undefined');

    const before = (!isNewMovie && getMovie(match.params.id)) || null;

    let movie = (isNewMovie && {}) || {...before};
    movie.title = title;
    movie.genre = genre;
    movie.stock = parseInt(stock);
    movie.rate = parseInt(rate);

    if (isNewMovie) {
      this.props.createMovie(movie);
    } else {
      this.props.updateMovie(before, movie);
    }

    this.props.history.replace('/movies');
  }

  onSubmitHasErrors() {
    console.log('submit has errors', this.state.errors);
  }

  mapToViewModel(movie) {
    const {title, genre, stock, rate} = { ...movie };
    return {title, genre, stock, rate};
  }

  render() {
    let {genres} = this.props;
    const movie = {...this.state.data};
    const nothing = 'Select a Genre';
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: 'title',
            type: 'text',
            label: "Title",
            placeholder: "My Title",
            help: "We'll never share your email with anyone else.",
          })}
          {this.renderInput({
            name: 'stock',
            type: 'number',
            label: "How many?",
            placeholder: "0",
            step: 1,
          })}
          {this.renderSelect({
            name: 'genre',
            type: 'select',
            label: "Genre",
            placeholder: "0",
            elements: genres,
            selectOptions: {
              selected: (movie && movie.genre) || nothing,
              nothing: nothing
            },
          })}
          {this.renderInput({
            name: 'rate',
            type: 'range',
            label: 'Stars',
            placeholder: (movie && movie.rate) || '5',
            help: "Give it a rank between 1 and 10",
            min: 0, 
            max: 10,
            setp: 1,
          })}
          {this.renderButton('Save')}
        </form>

      </React.Fragment>
    );
  }
}

MovieForm.propTypes = propTypes;
export default MovieForm;
