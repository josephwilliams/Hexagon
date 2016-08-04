import React from 'react';
import Board from '../js/board';
import BoardComponent from './board_comp';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board };
  }

  updateBoard (coords) {
    var board = this.state.board;
    
  }

  render () {
    return (
      <div className="game-container">
        <BoardComponent
          board={this.state.board}
          updateBoard={this.updateBoard}
        />
      </div>
    )
  }
}

export default Game;
