import React from 'react';
import { Link } from 'react-router-dom';

class Dropdown extends React.Component {
  state={
    collapsed: true,
  };

  switchCollapsedState(collapsed) {
    return () => this.setState({collapsed:!collapsed});
  }

  render() {
    const {collapsed} = this.state;
    let {parentId, header, items, textPropName, pathPropName, onDropdownItemClick} = this.props;
    parentId = parentId || 'navDropdownToggle';
    textPropName = textPropName || 'text';
    pathPropName = pathPropName || 'path';

    return (
      <React.Fragment>
        <Link
          className="nav-link dropdown-toggle"
          to='#'
          id={parentId}
          onClick={this.switchCollapsedState(collapsed)}
        >
          {header}
        </Link>
        <div
          className={ "dropdown-menu" + (!collapsed ? ' show' : '')}
          aria-labelledby={parentId}
        >
          { items.map( item => {
            return (item === Dropdown.divider && (
              <div className="dropdown-divider"></div>
            )) || (
              <Link
                key={item.priority}
                onClick={() => {
                  this.switchCollapsedState(collapsed)();
                  onDropdownItemClick()
                } }
                className="dropdown-item"
                to={item[pathPropName]}
              >
                {item[textPropName]}
              </Link>
            )
          }) }
        </div>
      </React.Fragment>
    );
  }
}

Dropdown.dividier = 'divider';

export default Dropdown;
