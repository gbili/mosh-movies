import React from 'react';
import PropTypes from 'prop-types';

const TableHeaderCell = ({
  colId,
  value,
  sort:{
    sortHandler,
    sortableCols,
    sortDirection,
    sortBy,
  },
  colspan,
}) => {

  return (sortableCols.indexOf(colId) !== -1 && (
    <th
      className={ "clickable " + (sortBy === colId && sortDirection < 0 ? "dropup" : "dropdown") }
      onClick={ () => sortHandler(colId) }
      key={ colId }
      colSpan={ colspan }
    >
      <span className="dropdown-toggle">{ value }</span>
    </th>
  )) || (
    <th 
      key={ colId }
      colSpan={ colspan }
    >
      { value }
    </th>
  );

};

TableHeaderCell.propTypes = {
  colId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  sort: PropTypes.object,
};

TableHeaderCell.defaultProps = {
  isHeader: false,
}

export default TableHeaderCell;
