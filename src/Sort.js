class Sort {

  constructor(arrayToSort) {

    this.arrayToSort = arrayToSort;

  }

  compare(a, b) {
    let comparison;
    if (a === b) {
      comparison = 0;
    } else if (a > b) {
      comparison = 1;
    } else {
      comparison = -1;
    }
    return comparison;
  }

  in(direction) {
    if (typeof direction === 'undefined') {
      direction = 1;
    }
    this.arrayToSort.sort((a, b) => direction * this.compare(a, b));
  }

  byProp({propName, direction}) {
    if (typeof propName === 'undefined') {
      throw new Error(`Param object property: 'propName' is required`);
    }
    if (typeof direction === 'undefined') {
      direction = 1;
    }

    this.arrayToSort.sort((a, b) => {
      return direction * this.compare(a[propName], b[propName]);
    });

  }

}

export default Sort;
