import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Like from './Like';
import FilterSortPaginatedTable from './FilterSortPaginatedTable';
import {Link} from 'react-router-dom';

import * as api from '../services/apiService';

const propTypes = {
  match: PropTypes.object.isRequired,
};

class Movies extends Component {

  constructor(props) {
    super(props);
    const stateOwner = (typeof props.stateOwner !== 'undefined')? props.stateOwner : this;
    if (typeof props.stateOwner === 'undefined') {
      this.state = {
        movies: [ ...api.getMovies() ],
        genres: [ ...api.getGenres() ],
      };
    }
    this.likeHandler = this.likeHandler.bind(stateOwner);
    this.editHandler = this.editHandler.bind(stateOwner);
  }

  componentWillMount() {
    this.setTitleOnParent();
  }

  setTitleOnParent() {
    let year = null;

    const {match, setTitle} = this.props;

    if (match.params.year) {
      year = match.params.year;
    }

    if (typeof setTitle !== 'undefined') {
      setTitle('Movies' + (year !== null ? ` from the year ${year}` : ''));
    }
  }

  likeHandler(el) {
    // make a hard copy of movies because
    // we dont want to directly alter the state
    // we can only alter state through this.setState()
    // and since this.state.movies array is still an object,
    // the movies const is a reference to the same
    // object as this.state.movies, wo any change to one
    // is a change to the other. So any change to movies
    // is a change to the state ; not allowed!
    const movies = [...this.state.movies];
    const index = movies.indexOf(el);
    // make a hard copy of the object we are going to alter
    // to avoid modifying the state directly for the same reasons as above
    movies[index] = {...movies[index]};
    movies[index].like = !movies[index].like;
    this.setState({movies});
  }

  getDeleteButtonMarkup(el) {
    let {id} = el;
    return (
      <Button
        classes={['danger', 'sm']}
        value='Delete'
        clickHandler={() => this.props.deleteMovie(id)}
      />
    );
  };

  editHandler(id) {
    this.props.history.push(`/admin/movie/${id}`);
  }

  getEditButtonMarkup(el) {
    let {id} = el;
    return (
      <Button
        classes={['primary', 'sm']}
        value='Edit'
        clickHandler={() => this.editHandler(id)}
      />
    );
  };

  getLikeMarkup(el) {
    return (
      <Like
        id={ el.id }
        like={ el.like }
        clickHandler={ () => this.likeHandler(el) }
      />
    );
  };

  getDateLinkMarkup(el) {
    return (
      <Link to={ `/movies/${ el.date }` }>{el.date}</Link>
    );
  }

  getMovieLinkMarkup(el) {
    return (
      <Link to={ `/movie/${ el.id }` }>{el.title}</Link>
    );
  }

  render() {

    const headerRow = {
      id: 0,
      cellsObject: {
        title: 'Title',
        genre: 'Genre',
        date: 'Date',
        stock: 'Stock',
        rate: 'Rate',
        like: '',
        action: 'Action',
      },
    };

    let {genres, movies} = (typeof this.props.stateOwner !== 'undefined')
      ? this.props
      : this.state;

    const {match} = this.props;

    let year = null;

    if (match.params.year) {
      year = match.params.year;
      movies = movies.filter(m => m.date === year)
    }

    const allowedFilters = genres.map(g => {
      return {
        by: 'genre',
        value: g.name,
        el: {
          key: g.id,
          value:g.name
        }
      }
    });

    return (
      <React.Fragment>
        <FilterSortPaginatedTable
          allowedFilters={allowedFilters}
          blankFilters={[
            { by: 'genre', value: 'All Genres', el: { key: 0, value: 'All Genres' } },
            { by: 'title', value: '', el: { key: 0, value: '' } },
          ]}

          aboveTable={(
            <Link
              className={['btn', 'btn-primary', 'btn-sm'].join(' ')}
              to="/admin/movie/new"
            >
              New Movie
            </Link>
          )}

          headerRow={headerRow}

          sort={{
            sortableCols: Object.keys(headerRow.cellsObject).filter(a => a !== 'action'),
          }}

          rowGenerator={item => {
            return {
              id: item.id,
              cellsObject: {
                title: this.getMovieLinkMarkup(item),
                genre: item.genre,
                date: this.getDateLinkMarkup(item),
                stock: item.stock,
                rate: item.rate,
                like: this.getLikeMarkup(item),
                action: (
                  <div className="btn-group" role="group" aria-label="Hello">
                    {this.getEditButtonMarkup(item)}
                    {this.getDeleteButtonMarkup(item)}
                  </div>
                ),
              },
            };
          }}

          items={movies}

          footerRow={(items) => {
            return {
              cellsObject: {
                data: `Showing ${items.length} movies of ${movies.length}`,
              }
            }
          }}

          itemsPerPage={5}
        />
      </React.Fragment>
    );
  }
}

Movies.propTypes = propTypes;

export default Movies;
