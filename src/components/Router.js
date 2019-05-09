import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Sort from '../Sort';

function Router({routes, forwardProps}) {

  let redirect = null;

  const sortRoutes = new Sort(routes);
  sortRoutes.byProp({propName:'priority', direction:-1});

  return (
    <Switch>
      { routes.map(route => {
        if (typeof route.notFound !== 'undefined' && route.notFound) {
          redirect = <Redirect to={route.path} />;
        }
        return (
          <Route
            key={route.priority}
            exact={ route.exact }
            path={route.path}
            render={ (route.hasOwnProperty('render') && route.render) || (props => {
              return <route.component {...props} {...forwardProps} />;
            }) }
          />);
        })
      }
      {redirect}
    </Switch>
  );

}

export default Router;
