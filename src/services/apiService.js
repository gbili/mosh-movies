import http from './httpService';
import config from '../config.json';

async function getMovies() {
  let {data: movies } = await http.get(`${config.apiEndpoint}/movies`);
  movies = movies.map(m => {
    m.id = m._id;
    m.like = false;
    m.genre = m.genre.name;
    return m;
  });
  return movies;
}

async function getGenres() {
  let {data: genres } = await http.get(`${config.apiEndpoint}/genres`);
  genres = genres.map(g => {
    g.id = g._id;
    return g;
  });
  return genres;
}

async function createMovie(movie) {
  const moviesOld = [...this.state.movies];
  if (typeof movie.id !== 'undefined') {
    throw new Error('Should not have an id if new movie');
  }
  movie.date = '2019';
  movie.like = false;

  const {genre, like, ...sendableData} = movie;
  sendableData.genreId = this.state.genres.filter(g => g.name === movie.genre).pop().id;

  const movies = [movie, ...this.state.movies];
  movie.id = 'fakeTempId';
  this.setState({ movies });
  try {
    const {data} = await http.post(config.apiEndpoint + `/movies`, sendableData);
    movie.id = data._id;
  } catch (e) {
    this.setState({ movies: moviesOld });
  }
}

async function updateMovie(before, after) {
  const moviesOld = [...this.state.movies];
  const movies = [...this.state.movies];
  const index = this.state.movies.indexOf(before);
  movies[index] = after;

  const {genre, like, _id, id, ...sendableData} = after;
  sendableData.genreId = this.state.genres.filter(g => g.name === after.genre).pop().id;

  this.setState({movies});
  try {
    await http.put(config.apiEndpoint + `/movies/${before.id}`, sendableData);
  } catch (e) {
    this.setState({movies:moviesOld});
  }
}

async function deleteMovie(id) {
  const moviesOld = [...this.state.movies];
  this.setState({ movies: this.state.movies.filter(m => m.id !== id) });
  try {
    await http.delete(config.apiEndpoint + `/movies/${id}`);
  } catch (e) {
    this.setState({movies:moviesOld});
  }
}

export {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getGenres,
}
