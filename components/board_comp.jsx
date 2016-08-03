import React from 'react';
import BoardJS from '../js/board';
import Tile from './tile_comp';

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = { board: new BoardJS };
  }

  showBoard () {
    var boardTiles = [];
    var board = this.state.board.grid;

    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        let tileState = board[i][j];
        boardTiles.push(
          <Tile
            position={[i, j]}
            tileState={tileState}
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
