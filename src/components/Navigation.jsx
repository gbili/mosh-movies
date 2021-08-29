import React, {Component} from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import Sort from '../Sort';
import Dropdown from './Dropdown';

class Navigation extends Component {
  state = {
    collapsed: true,
  };

  switchCollapsedState() {
    const {collapsed} = this.state;
    return () => this.setState({collapsed:!collapsed});
  }

  render() {
    let {brand, routes, location, user} = this.props;

    const {collapsed} = this.state;
    const sortNavItems = new Sort(routes);
    sortNavItems.byProp({propName:'priority', direction:-1});

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link
          className="navbar-brand"
          to={brand.path}
        >
          {brand.title}
        </Link>
        {user && <span>{user.name}</span>}
        <button
          onClick={this.switchCollapsedState()}
          className={ "navbar-toggler" + (collapsed ? " collapsed" : "") }
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={ collapsed ? "true" : "false" }
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Collapse className="navbar-collapse" in={ !this.state.collapsed }>
          <div>
          <ul className="navbar-nav mr-auto">
            {routes.map((route) => {
              let isActive = location.pathname === route.path;
              let isDropdown = typeof route.subMenu !== 'undefined';
              return (
                <li
                  key={route.priority}
                  className={
                    "nav-item" + (isActive ? ' active' : '') + (isDropdown ? ' dropdown' : '')}
                >
                  {(!isDropdown && (
                    <Link
                      className="nav-link"
                      to={ route.path }
                      onClick={this.switchCollapsedState()}
                    >
                      {route.title}
                      {isActive ? <span className="sr-only">(current)</span> : null}
                    </Link>
                  )) || (
                    <Dropdown
                      onDropdownItemClick={this.switchCollapsedState()}
                      header={route.title}
                      parentId="navDropdownToggle"
                      items={route.subMenu}
                      textPropName="title"
                      pathPropName="path"
                    />
                  )}
                </li>
              );
            })}
          </ul>
          </div>
        </Collapse>
      </nav>
    );
  }
}


Navigation.defaultProps = {
  brand: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(Navigation);
