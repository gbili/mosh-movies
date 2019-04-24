import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListGroup, {singlePropObjAreEqual} from './ListGroup';
import Table from './Table';
import Pagination from './Pagination';

class FilterSortPaginatedTable extends Component {

  static propTypes = {
    currentFilter: PropTypes.object,
    blankFilter: PropTypes.object,
    allowedFilters: PropTypes.array.isRequired,
    onFilter: PropTypes.func,
    items: PropTypes.array.isRequired,

    headerRow: PropTypes.object.isRequired,
    sort: PropTypes.object,

    footerRow: PropTypes.object.isRequired,
    rowGenerator: PropTypes.func.isRequired,

    itemsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
  };

  static defaultProps = {
    itemsPerPage: 4,
  };

  state = {
    currentFilter: null,
    currentPage: 1,
    sortDirection: 1,
    sortKey: null,
  }

  // Do the filtering
  getFilteredItems() {
    const {items, blankFilter} = this.props;
    const {currentFilter} = this.state;

    if (currentFilter === null){
      return items;
    }

    const filterValue = Object.values(currentFilter).pop();
    const filterKey = Object.keys(currentFilter).pop();

    return !singlePropObjAreEqual(currentFilter, blankFilter)
      ? items.filter(item => filterKey in item && item[filterKey] === filterValue)
      : items;
  }

  sortItems() {
    const {sortDirection, sortKey} = this.state;

    if (sortKey !== null) {
      this.filteredItems.sort((a, b) => {
        return sortDirection*((a[sortKey] === b[sortKey])
          ? 0
          : ((a[sortKey] > b[sortKey])
            ? 1
            : -1)
        );
      });
    }
  }

  getSortObject() {
    const {sort} = this.props;
    sort.sortDirection = this.state.sortDirection;
    sort.sortKey = this.state.sortKey;
    sort.sortHandler = sortKey => {
      const sortDirection = (this.state.sortKey === sortKey)
        ? this.state.sortDirection*(-1)
        : 1;
      this.setState({sortKey, sortDirection})
    };
    return sort;
  }

  render() {

    const {
      headerRow,
      rowGenerator,
      footer,
      allowedFilters,
      blankFilter,
      onFilter,
      itemsPerPage
    } = this.props;

    const {currentFilter, currentPage} = this.state;

    this.filteredItems = this.getFilteredItems();
    this.sortItems();
    this.displayableItems = Pagination.itemsSlice(
      this.filteredItems,
      currentPage,
      itemsPerPage
    );

    return (
        <div className="container">
          <div className="row">
            <div className="col-sm col-sm-3 col-xs-12">
              <ListGroup
                currentItem={ currentFilter }
                items={ allowedFilters }
                onItemSelect={ filter => {
                  this.setState({currentFilter: filter, currentPage: 1});
                  onFilter && onFilter();
                } }
                defaultItem={ blankFilter }
              />
            </div>
            <div className="col-sm col-sm-9 col-xs-12">
              <Table
                headerRow={ headerRow }
                rows={ this.displayableItems.map(rowGenerator) }
                sort={ this.getSortObject() }
                footer={ footer }
              />
              <Pagination
                itemsPerPage={ itemsPerPage }
                itemsCount={ this.filteredItems.length }
                currentPage={ currentPage }
                onPageSelect={ page => this.setState({ currentPage: page })}
              />
            </div>
          </div>
        </div>
    );
  }
}


export default FilterSortPaginatedTable;
