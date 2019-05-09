import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Router from './components/Router';
import Navigation from './components/Navigation'
import * as api from './services/apiService';
import RoutesConfig from './router.config.js'

class App extends Component {

  state = {
    title: 'No Title',
    movies: [],
    genres: [],
  };

  constructor(props) {
    super(props);

    this.setTitle = this.setTitle.bind(this);
    this.getMovie = this.getMovie.bind(this);
    this.createMovie = api.createMovie.bind(this);
    this.updateMovie = api.updateMovie.bind(this);
    this.deleteMovie = api.deleteMovie.bind(this);
  }

  async componentDidMount() {
    const movies = await api.getMovies();
    const genres = await api.getGenres();
    this.setState({movies, genres});
  }

  setTitle(title) {
    this.setState({title});
  }

  getMovie(id) {
    const filtered = this.state.movies.filter(m => m.id === id);
    return filtered.length ? filtered[0] : null;
  }

  // optional params are passed as the match prop object: inside comp this.props.match.year
  // params are passed as a prop in params object.
  // that said, optional parameters should be included in the query and not in the path
  // TODO install npm i query-string for query strings then from the component we need
  // to include prop: location. Then we parse with:queryString.parse(location.search) which
  // produces an object with key values of query strings, but values will be strings not ints

  // or <Route path={route.path} render={() => <MyComponent hello={some}/>}/>
  //
  // or to make history related props available we need to pass props like this:
  // <Route path={route.path} render={props => <MyComponent {...props} h={some}/>}/>
  //
  // or using below but this does not allow to pass custom props
  // <Route path={route.path} component={route.component} />
  // {route.exact}

  render() {
    const routesConfig = new RoutesConfig();
    routesConfig.prepareAdminNestedRoutes(
      this.state.genres,
      this.getMovie,
      this.createMovie,
      this.updateMovie,
      this.setTitle
    );
    routesConfig.prepareRoutes(
      this,
      this.deleteMovie,
      this.state.genres,
      this.state.movies,
      this.setTitle
    );

    return (
      <React.Fragment>
        <ToastContainer />
        <Navigation
          routes={routesConfig.navigationElements}
          brand={{path:'/', title:'My App'}}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm col-sm-12">
              <h1 style={{textAlign:'center'}}>{this.state.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Router routes={routesConfig.routes} forwardProps={{setTitle:this.setTitle}}/>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default withRouter(App);
