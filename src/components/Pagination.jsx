import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {

  static itemsSlice(items, page, itemsPerPage) {
    const from = (page - 1)*itemsPerPage;
    const to = from + itemsPerPage;
    return items.slice(from, to);
  }

  static pagesCount(totalItems, itemsPerPage) {
    const rest = totalItems % itemsPerPage;
    return ((totalItems - rest) / itemsPerPage) + (rest>0?1:0);
  }

  prepareClickHandler(p) {
    let page = p;
    return () => {
      this.props.onPageSelect(page);
    };
  }

  render(){
    const {itemsCount, itemsPerPage, currentPage} = this.props;
    const pagesCount = Pagination.pagesCount(itemsCount, itemsPerPage);
    let p = 1;
    return (pagesCount > 1 && (
      <nav aria-label="...">
        <ul className="pagination pagination-sm">
          { Array(pagesCount).fill(1).map(() => {
            return (p === currentPage && (
                <li key={p} className="page-item active" aria-current="page">
                  <span className="page-link">
                    {p++}
                    <span className="sr-only">(current)</span>
                  </span>
                </li>
            )) || (
              <li key={p} className="page-item">
                <a onClick={ this.prepareClickHandler(p) } className="page-link" href={"#" + p}>{p++}</a>
              </li>
            )
          })}
        </ul>
      </nav>
      )
    ) || null;
  }
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageSelect: PropTypes.func.isRequired,
};

export default Pagination;
