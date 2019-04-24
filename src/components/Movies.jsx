import React, { Component } from 'react';

import Button from './Button';
import Like from './Like';
import FilterSortPaginatedTable from './FilterSortPaginatedTable';

class Movies extends Component {

  state = {
    movies: [
      {id: 1, title: 'The Who', genre: 'Musical', date: '1960', like: false},
      {id: 2, title: 'The Who', genre: 'Musical', date: '1974', like: false},
      {id: 3, title: 'Airplane', genre: 'Comedy', date: '1983', like: false},
      {id: 4, title: 'China', genre: 'Comedy', date: '1991', like: false},
      {id: 5, title: 'Vol au dessus', genre: 'Drama', date: '2004', like: false},
      {id: 6, title: 'Martin Cappote', genre: 'Biopic', date: '1970', like: false},
      {id: 7, title: 'Dart', genre: 'Musical', date: '1960', like: false},
      {id: 8, title: 'Billy', genre: 'Musical', date: '1960', like: false},
      {id: 9, title: '10 negritos', genre: 'Crime', date: '2004', like: false},
      {id: 10, title: 'Dupontel', genre: 'Biopic', date: '2001', like: false},
      {id: 11, title: 'Cancer', genre: 'Drama', date: '2013', like: false},
      {id: 12, title: 'The Godfather', genre: 'Crime', date: '2025', like: false},
      {id: 13, title: 'Eyes Wide Shut', genre: 'Drama', date: '1925', like: false},
      {id: 14, title: 'Eyes Wide Open', genre: 'Drama', date: '1926', like: false},
      {id: 15, title: 'Eyes Closed', genre: 'Drama', date: '1926', like: false},
    ],
    genres: [
      'Musical',
      'Comedy',
      'Drama',
      'Biopic',
      'Crime',
    ],
  };

  likeHandler = (el) => {
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
        classes={['danger']}
        value='Delete'
        clickHandler={() => {
          this.setState({ movies: this.state.movies.filter(movie => movie.id !== id) });
        } }
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

  render() {

    const headerRow = {
      id: 0,
      cellsObject: {
        title: 'Title',
        genre: 'Genre',
        date: 'Date',
        like: '',
        action: 'Action',
      },
    };

    let {genres, movies} = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm col-sm-12">
            <h2 style={ {textAlign:'center'} }>Movies</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FilterSortPaginatedTable
              allowedFilters={ genres.map(g => { return {genre: g}}) }
              blankFilter={ { all: 'All Genres' } }

              headerRow={ headerRow }

              sort={ {
                sortableCols: Object.keys(headerRow.cellsObject).filter(a => a !== 'action'),
              } }

              rowGenerator={ item => {
                return {
                  id: item.id,
                  cellsObject: {
                    title: item.title,
                    genre: item.genre,
                    date: item.date,
                    like: this.getLikeMarkup(item),
                    action: this.getDeleteButtonMarkup(item),
                  },
                };
              } }

              items={ movies }

              footerRow={ {
                cellsObject: {
                  data: `Total of ${movies.length}`,
                }
              } }

              itemsPerPage={ 5 }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
