import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ defaultItem, currentItem, items, onItemSelect }) => {

  items = [defaultItem, ...items]; // we dont want to alter the original array

  const isActive = (item) => {
    if (typeof item === 'object') {
      return (currentItem === null && singlePropObjAreEqual(item, defaultItem)
        ) || singlePropObjAreEqual(item, currentItem);
    }
    return (currentItem === null && defaultItem === item
      ) || item === currentItem;
  }

  return (
    <ul className="list-group">{
      items.map(item => {
        const className = "clickable list-group-item" + (isActive(item) ? ' active' : '');
        const itemValue = (typeof item === 'object' && Object.values(item).pop()) || item;
        return (
          <li
            key={ itemValue }
            className={ className }
            onClick={ () => onItemSelect(item) }
          >
            { itemValue }
          </li>
        );
      })
    }
    </ul>
  );
}

ListGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  // currentItem: PropTypes.string, // or single prop object
  // defaultItem: PropTypes.string.isRequired, // or single prop object
  items: PropTypes.array.isRequired, // array of strings or of single prop objects
  onItemSelect: PropTypes.func.isRequired,
};

ListGroup.defaultProps = {
  defaultItem: 'All'
};

// Filters are key:value pair objects, support them
function singlePropObjAreEqual(obj1, obj2) {
  if (obj1 === null || obj2 === null) {
    return false;
  }
  return Object.keys(obj1).pop() === Object.keys(obj2).pop()
    && Object.values(obj1).pop() === Object.values(obj2).pop();
}


export default ListGroup;
export {singlePropObjAreEqual};
