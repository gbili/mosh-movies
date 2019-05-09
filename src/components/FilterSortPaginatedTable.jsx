import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListGroup from './ListGroup';
import Table from './Table';
import Pagination from './Pagination';
import Sort from '../Sort'
import FormGroup from './FormGroup'

class FilterSortPaginatedTable extends Component {

  static propTypes = {
    filterBy: PropTypes.object,
    blankFilter: PropTypes.object,
    allowedFilters: PropTypes.array.isRequired,
    onFilter: PropTypes.func,
    items: PropTypes.array.isRequired,

    headerRow: PropTypes.object.isRequired,
    sort: PropTypes.object,

    rowGenerator: PropTypes.func.isRequired,

    itemsPerPage: PropTypes.number,
    onPageChange: PropTypes.func,
  };

  static defaultProps = {
    itemsPerPage: 4,
  };

  state = {
    filterBy: null,
    currentPage: 1,
    sortDirection: 1,
    sortKey: null,
    items: [],
  }

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  prepareItems() {
    const items = this.filterItems();
    this.sortItems(items);
    return items;
  }

  handleSearch({currentTarget: input}) {
    const filterBy = { by: 'title', value: input.value };
    const r = new RegExp(filterBy.value, 'i');
    this.updateFilter(
      filterBy,
      (item, filterBy) => r.test(item[filterBy.by])
    );
  }

  handleFilterSelect(filterBy) {
    this.updateFilter(
      filterBy,
      (item, filterBy) => item[filterBy.by] === filterBy.value
    );
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
  }

  updateFilter(filterBy, filter) {
    this.setState({
      filterBy,
      currentPage: 1,
      filter: (this.isBlankFilter(filterBy)
        ? (item, filterBy) => true
        : filter
      ),
    });
  }

  isBlankFilter(filterBy) {
    const { blankFilters } = this.props;
    const matchingBlankFilters = blankFilters.filter(
      f => f.by === filterBy.by && f.value === filterBy.value
    );
    return matchingBlankFilters.length > 0;
  }

  filterItems() {
    const { filterBy, filter } = { ...this.state }
    const { items } = this.props;

    if (typeof filterBy === 'undefined' || typeof filter === 'undefined' ) {
      return items;
    }
    return items.filter(item => filterBy.by in item && filter(item, filterBy));
  }

  sortItems(items) {
    const sort = new Sort(items);
    sort.byProp({ propName: this.state.sortKey, direction: this.state.sortDirection});
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
      footerRow,
      allowedFilters,
      blankFilters,
      itemsPerPage
    } = this.props;

    const { filterBy, currentPage } = this.state;
    const items = this.prepareItems();
    const displayableItems = Pagination.itemsSlice(
      items,
      currentPage,
      itemsPerPage
    );
    const defaultGenreFilter = blankFilters.filter(f => f.by === 'genre').pop();
    const hasCurrentFilter = filterBy && filterBy.by === 'genre';
    return (
        <div className="container">
          <div className="row">
            <div className="col-sm col-sm-3 col-xs-12">
              <ListGroup
                currentItem={(hasCurrentFilter && filterBy) || defaultGenreFilter}
                items={allowedFilters}
                getItemKeyOrValue={(item, kOrV) => item.el[kOrV]}
                onItemSelect={this.handleFilterSelect}
                defaultItem={defaultGenreFilter}
              />
            </div>
            <div className="col-sm col-sm-9 col-xs-12">
              {this.props.aboveTable || null}
              <FormGroup
                name="search"
                help="Type your movie title to filter movies"
              >
                <input
                  id="search"
                  name="search"
                  onChange={this.handleSearch}
                  type="text"
                  className="form-control"
                  placeholder="My favorite movie"
                  aria-describedby={'searchHelp'}
                  value={(
                    filterBy
                    && typeof filterBy.by !== 'undefined'
                    && filterBy.by === 'title'
                    && filterBy.value
                    ) || ''
                  }
                />
              </FormGroup>
              <Table
                headerRow={headerRow}
                rows={displayableItems.map(rowGenerator)}
                sort={this.getSortObject()}
                footerRow={((typeof footerRow === 'function') && footerRow(items)) || footerRow}
              />
              <Pagination
                itemsPerPage={itemsPerPage}
                itemsCount={items.length}
                currentPage={currentPage}
                onPageSelect={this.handlePageChange}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default FilterSortPaginatedTable;
