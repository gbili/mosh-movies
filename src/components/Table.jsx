import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

const Table = ({ rows, headerRow, sort, footerRow}) => {

  return ( rows.length > 0 && (
    <table className='table'>
      { (headerRow && (
      <thead>
        <TableRow
          isHeader={ true }
          id={ headerRow.id.toString() }
          cells={ headerRow.cellsObject }
          sort={ sort }
        />
      </thead>
      )) || null }
      <tbody>{
        rows.map( row => (
          <TableRow
            key={ row.id.toString() }
            id={ row.id.toString() }
            cells={ row.cellsObject }
          />
        )) }
      </tbody>
      { (footerRow && (
      <tfoot>
        <TableRow
          cells={ footerRow.cellsObject }
          colspan={ footerRow.colspan || (Object.keys(footerRow.cellsObject).length === 1 && Object.keys(rows[0].cellsObject).length) }
        />
      </tfoot>
      )) || null }
    </table>
  )) || <p>There are no elements to display in the table</p>;

}

Table.propTypes = {
  rows: PropTypes.array.isRequired,
  headerRow: PropTypes.object,
  sort: PropTypes.object,
};

export default Table;
