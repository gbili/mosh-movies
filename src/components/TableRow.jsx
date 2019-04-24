import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderCell from './TableHeaderCell';

// Stateless Functional Component
const TableRow = ({cells, isHeader, id, sort, colspan}) => {

  const colIds = Object.keys(cells);

  return (
    <tr key={ id }>{
      colIds.map( colId => {
        let value = cells[colId];
        return (!isHeader && (
          <td
            key={ colId }
            colSpan={ colspan }
          >
            { value }
          </td>
        )) || (
          <TableHeaderCell
            key={ colId }
            colId={ colId }
            value={ value }
            sort={ sort }
            colspan={ colspan }
          />
        );
      }) }
    </tr>
  );
};

TableRow.propTypes = {
  cells: PropTypes.object.isRequired,
  isHeader: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};
TableRow.defaultProps = {
  isHeader: false,
}

export default TableRow;
