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

  persistGame () {
    if (!this.isOver()){
      console.log("game persists!");
      this.switchPlayers();
    } else {
      this.endGame();
    }
  }

  // #considerMove considers this.currentMove (1 or 2);
  // if #goodfirstSelect calls #updateGridFirstSelect;
  // if #goodSecondSelect via #logicalSecondSelect
  // calls #updateGridSecondSelect; #resolveBoard; then #switchPlayers;
  // this.gameState determined by #isOver;
  // #endGame otherwise;
  considerMove (coords) {
    console.log("current player:" + this.currentPlayer.num);
    console.log("current move:" + this.currentMove);

    if (this.currentMove === 1){
      if (this.goodFirstSelect(coords)){
        this.message = "good first selection.";
        console.log(this.message);
        this.currentMove = 2;
        return this.updateGridFirstSelect(coords);
      } else {
        this.message = "invalid first selection.";
        console.log(this.message);
        return this.restartTurn();
      }
    } else {
      if (this.goodSecondSelect(coords)){
        this.message = "valid move!";
        console.log(this.message);
        this.currentMove = 1;
        return this.updateGridSecondSelect(coords);
      } else {
        this.message = "invalid second selection.";
        console.log(this.message);
        return this.restartTurn();
      }
    }
  }

  goodFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];
    if (this.currentPlayer === this.player1){
      if (this.grid[y][x] !== 1) {
        console.log("player 1: bad first select");
        return false;
      }
    } else if (this.currentPlayer === this.player2){
      if (this.grid[y][x] !== 2) {
        console.log("player 2: bad first select");
        return false;
      }
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

    if (this.between(x1, (x2 + 2), (x2 - 2)) && this.between(y1, (y2 + 2), (y2 - 2))) {
      return true;
    } else {
      return false;
    }
  }

  between(a, x, y) {
    return a <= x && a >= y;
  }

  updateGridFirstSelect (coords) {
    var x = coords[1];
    var y = coords[0];

    // make available spaces glow
  }

  updateGridSecondSelect (coords) {
    var x = coords[1];
    var y = coords[0];

    this.grid[y][x] = this.currentPlayer.num;
    this.persistGame();
  }

  resolveBoard () {
    // undo the glowing open spaces after move is made
  }

  restartTurn () {
    this.firstSelect = null;
    this.currentMove = 1;
    this.message = "restart turn.";
    console.log(this.message);
  }

  switchPlayers () {
    console.log("switch players.");
    this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
    console.log("player turn:" + this.currentPlayer.name);
  }

  isOver() {
    var flattened = this.grid.reduce((a, b) => a.concat(b));

    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === false)
        return false;
    }

    return true;
  }

  endGame () {
    this.message = "game over!";
    console.log(this.message + "winner is:" + this.currentPlayer.name);
    this.winner = this.currentPlayer;
    this.gameState = false;
  }
}
