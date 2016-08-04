import Player from './player';
import GridShapes from './grid_shapes';

export default class Board {
  constructor () {
    this.grid = [];
    this.player1 = new Player('player 1', 1);
    this.player2 = new Player('player 2', 2);
    this.currentPlayer = this.player1;
    this.currentMove = 1;
    this.firstSelect = null;
    this.gameState = true;
    this.winner = null;
    this.message = "";

    this.populateGrid();
  }

  populateGrid () {
    // randomly selects number between 1-3
    var gridKey = Math.floor(Math.random() * (4 - 1)) + 1;
    this.grid = GridShapes[gridKey];
  }

  updateGridFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    this.grid[y][x] = value;
  }

  updateGridSecondSelect (coords) {
    var x = coords[1];
    var y = coords[0];
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

  // #considerMove considers move count (1st or 2nd);
  // if #goodfirstSelect; if #goodSecondSelect;
  // calls #updateGrid if so; then #switchPlayers;
  // this.gameState determined by #isOver;
  // #endGame otherwise;
  considerMove (coords) {
    if (this.currentMove === 1){
      if (this.goodFirstSelect(coords)){
        this.message = "good click.";
        console.log(this.message);
        this.updateGridFirstSelect(coords);
      } else {
        this.message = "invalid first selection.";
        console.log(this.message);
        this.restartTurn();
      }

      this.currentMove ++;
    } else {
      if (this.goodSecondSelect(coords)){
        this.message = "valid move!";
        console.log(this.message);
        this.updateGridSecondSelect(coords);
      } else {
        this.message = "invalid move selection.";
        console.log(this.message);
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
    this.message = "restart turn.";
    console.log(this.message);
  }

  switchPlayers () {
    this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
    console.log("turn:" + this.currentPlayer.name);
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
    this.message = "game over!";
    console.log(this.message + "winner is:" + this.currentPlayer.name);
    this.winner = this.currentPlayer;
    this.gameState = false;
  }
}
