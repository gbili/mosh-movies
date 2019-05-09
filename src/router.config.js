import React from 'react';
import Admin from './components/Admin';
import Home from './components/Home';
import Movie from './components/Movie';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import NotFound from './components/NotFound';

class RoutesConfig {
  prepareAdminNestedRoutes(genres, getMovie, createMovie, updateMovie, setTitle) {
    this.adminNestedRoutes = [
      {priority:12, title: 'New Movie', path: `/admin/movie/new`, render: props => {
        return (
          <MovieForm
            genres={genres}
            createMovie={createMovie}
            updateMovie={updateMovie}
            setTitle={setTitle}
            {...props}
          />
        )
      }},
      {priority:11, title: 'Edit', path: `/admin/movie/:id`, render: props => {
        return (
          <MovieForm
            genres={genres}
            getMovie={getMovie}
            createMovie={createMovie}
            updateMovie={updateMovie}
            setTitle={setTitle}
            {...props}
          />
        )
      }},
    ];
  }

  prepareRoutes(stateOwner, deleteMovie, stateGenres, stateMovies, setTitle) {
    this.routes = [
      {priority:16, title: 'Movies', path: '/movies/:year?', render: props => {
        return (
          <Movies
            stateOwner={stateOwner}
            deleteMovie={deleteMovie}
            genres={stateGenres}
            movies={stateMovies}
            setTitle={setTitle}
            {...props}
          />
        );
      }},
      {priority:15, title: 'Movie', path: '/movie/:id', component: Movie},
      {priority:11, title: 'Login', path: '/login', component: LoginForm},
      {priority:13, title: 'Register', path: '/register', component: RegisterForm},
      {priority:9, title: 'Admin', path: '/admin', render: props => {
        return <Admin {...props} routes= { this.adminNestedRoutes } />
      }},
      {priority:1, title: '404', path: '/404', component: NotFound, notFound:true},
      {priority:0, title: 'Home', path: '/', component: Home, exact:true},
    ];
  }

  get navigationElements() {
    return [
      {priority:1000, title: 'Home', path: '/'},
      {priority:100, title: 'Movies', path: '/movies'},
      {priority:10, title: 'Admin', path: '#', subMenu:[this.adminNestedRoutes[0]]},
      {priority:9, title: 'Register', path: '/register'},
    ];
  }
}

export default RoutesConfig;
