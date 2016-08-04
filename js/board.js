import Player from './player'

class Board {
  constructor(){
    this.grid = [];
    this.player1 = new Player;
    this.player2 = new Player;
    this.currentPlayer = this.player1;
    this.currentMove = 1;
    this.firstMove = null;
    this.gameState = true;
    this.winner = null;

    this.populateGrid();
  }

  populateGrid() {
    this.grid = [
                 [1, false, false, null, null, false, false, 2],
                 [false, false, false, false, false, false, false, false],
                 [false, false, null, false, false, null, false, false],
                 [false, null, false, false, false, false, null, false],
                 [false, null, false, false, false, false, null, false],
                 [false, false, null, false, false, null, false, false],
                 [false, false, false, false, false, false, false, false],
                 [2, false, false, null, null, false, false, 1]
               ];
  }

  updateGrid (coords, value) {
    let x = coords[1];
    let y = coords[0];
    this.grid[y][x] = value;
  }

  startGame () {
    if (this.gameState){
      considerMove(coords);
    }
  }

  goodFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if (this.currentPlayer === 1){
      if (this.grid[y][x] != 1)
        return false;
    } else {
      if (this.grid[y][x] != 2)
        return false;
    }

    this.firstMove = [y, x];
    return true;
  }

  goodSecondSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if(this.grid[y][x] !== false)
      return false;
    if (logicalSecondSelect(coords)){
      return true;
    } else {
      return false;
    }
  }

  logicalSecondSelect (coords) {
    var y1 = this.firstMove[0];
    var x1 = this.firstMove[1];
    var y2 = coords[0];
    var x2 = coords[1];

    if (between(x1, (x2 + 2), (x2 - 2)) && between(y1, (y2 + 2), (y2 - 2))) {
      return true;
    } else {
      return false;
    }
  }

  considerMove (coords) {
    if (this.currentMove === 1){
      if (goodFirstSelect(coords)){
        updateGrid(coords);
      } else {
        restartTurn();
      }

      this.currentMove ++;
    } else {
      if (goodSecondSelect(coords)){
        updateGrid(coords);
      } else {
        restartTurn();
      }

      this.currentMove --;
    }

    if (!this.isOver){
      switchPlayers();
    } else {
      endGame();
    }
  }

  restartTurn () {
    this.firstMove = null;
    this.currentMove = 1;
    considerMove(coords);
  }

  switchPlayers () {
    this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
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

  endGame () {
    this.winner = this.currentPlayer;
    this.gameState = false;
  }
}

export default Board;
