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
    this.message = "begin!";
    this.redCount = 2;
    this.blueCount = 2;

    this.populateGrid();
  }

  populateGrid () {
    // randomly selects number between 1-3
    var gridKey = Math.floor(Math.random() * (4 - 1)) + 1;
    this.grid = GridShapes[gridKey];
  }

  persistGame () {
    this.scoreboard();
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
      var selectionData = this.goodSecondSelect(coords);
      // [0] will be true/false; [1] will be "jump"/"slide"
      if (selectionData[0]){
        this.message = "valid move!";
        console.log(this.message);

        if (selectionData[1] === "jump"){
          this.message = "jump!";
          console.log(this.message);

          this.currentMove = 1;
          return this.updateGridSecondSelectJump(coords);
        } else if (selectionData[1] === "slide"){
          this.message = "slide!";
          console.log(this.message);

          this.currentMove = 1;
          return this.updateGridSecondSelectSlide(coords);
        }
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

    var selectionData = this.logicalSecondSelect(coords);
    if (selectionData[0]){
      if (selectionData[1] === "jump"){
        return [true, "jump"];
      } else if (selectionData[1] === "slide"){
        return [true, "slide"];
      }
    } else {
      return false;
    }
  }

  logicalSecondSelect (coords) {
    var y1 = this.firstSelect[0];
    var x1 = this.firstSelect[1];
    var y2 = coords[0];
    var x2 = coords[1];

    if (this.between(x1, (x2 + 1), (x2 - 1)) && this.between(y1, (y2 + 1), (y2 - 1))) {
      return [true, "slide"];
    } else if (this.between(x1, (x2 + 2), (x2 - 2)) && this.between(y1, (y2 + 2), (y2 - 2))) {
      return [true, "jump"];
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

  updateGridSecondSelectJump (coords) {
    var x = coords[1];
    var y = coords[0];
    this.grid[y][x] = this.currentPlayer.num;

    var x1 = this.firstSelect[1];
    var y1 = this.firstSelect[0];
    this.grid[y1][x1] = false;

    this.persistGame();
  }

  updateGridSecondSelectSlide (coords) {
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

  scoreboard () {
    var flattened = this.grid.reduce((a, b) => a.concat(b));
    var blueCount = 0;
    var redCount = 0;
    for (var i = 0; i < flattened.length; i++) {
      if (flattened[i] === 1){
        redCount ++;
      } else if (flattened[i] === 2){
        blueCount ++;
      }
    }

    this.redCount = redCount;
    this.blueCount = blueCount;
  }
}
