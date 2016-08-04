import Player from './player';
import GridShapes from './grid_shapes';

class Board {
  constructor () {
    this.grid = [];
    this.player1 = new Player;
    this.player2 = new Player;
    this.currentPlayer = this.player1;
    this.currentMove = 1;
    this.firstSelect = null;
    this.gameState = true;
    this.winner = null;
    this.message = "";

    this.populateGrid();
  }

  populateGrid () {
    var gridKey = Math.floor(Math.random() * (4 - 1)) + 1;
    this.grid = GridShapes[gridKey];
  }

  updateGrid (coords, value) {
    let x = coords[1];
    let y = coords[0];
    this.grid[y][x] = value;
  }

  // gameState determined by #isOver
  // #considerMove considers move count (1st or 2nd);
  // if this.firstSelect is good; if move choice is good;
  // calls #updateGrid if so;
  persistGame (coords) {
    if (this.gameState){
      this.considerMove(coords);
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

    this.firstSelect = [y, x];
    return true;
  }

  goodSecondSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if(this.grid[y][x] !== false)
      return false;
    if (this.logicalSecondSelect(coords)){
      return true;
    } else {
      return false;
    }
  }

  logicalSecondSelect (coords) {
    var y1 = this.firstSelect[0];
    var x1 = this.firstSelect[1];
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
      if (this.goodFirstSelect(coords)){
        this.updateGrid(coords);
      } else {
        this.restartTurn();
      }

      this.currentMove ++;
    } else {
      if (this.goodSecondSelect(coords)){
        this.updateGrid(coords);
      } else {
        this.restartTurn();
      }

      this.currentMove --;
    }

    if (!this.isOver){
      this.switchPlayers();
    } else {
      this.endGame();
    }
  }

  restartTurn () {
    this.firstSelect = null;
    this.currentMove = 1;
    this.message = "invalid move.";
    console.log(this.message);
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
