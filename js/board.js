class Board {
  constructor(){
    this.grid = [];
    this.populate();
  }

  populate() {
    this.grid = [
                 [false, false, false, null, null, false, false, false],
                 [false, false, false, false, false, false, false, false],
                 [false, false, null, false, false, null, false, false],
                 [false, null, false, false, false, false, null, false],
                 [false, null, false, false, false, false, null, false],
                 [false, false, null, false, false, null, false, false],
                 [false, false, false, false, false, false, false, false],
                 [false, false, false, null, null, false, false, false]
               ];
  }

  isOver() {
    this.grid.forEach(arr => {
      arr.forEach(el => {
        if (el === false || el === null)
          return false;
      });
    });
    return true;
  }


}

export default Board;
