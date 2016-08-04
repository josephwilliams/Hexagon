import React from 'react';
import BoardJS from '../js/board';
import Tile from './tile_comp';

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = { board: new BoardJS };
  }

  showBoard () {
    const boardTiles = [];
    const grid = this.state.board.grid;
    const board = this.state.board;

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        let tileState = grid[i][j];
        boardTiles.push(
          <Tile
            position={[i, j]}
            tileState={tileState}
            currentPlayer={board.currentPlayer}
            onClick={() => this.considerMove([i, j])}
            key={[i, j]}
          />
        )
      }
    }

    return boardTiles;
  }

  render () {
    return (
      <div className="board-container">
        {this.showBoard()}
      </div>
    )
  }

}

export default Board;
