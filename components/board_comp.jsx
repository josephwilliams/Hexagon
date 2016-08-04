import React from 'react';
import Tile from './tile_comp';

class Board extends React.Component {
  showBoard () {
    const boardTiles = [];
    const grid = this.props.board.grid;

    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[i].length; j++) {
        let tileState = grid[i][j];
        boardTiles.push(
          <Tile
            position={[i, j]}
            tileState={tileState}
            currentPlayer={this.props.board.currentPlayer}
            open={false}
            updateBoard={this.props.updateBoard}
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
