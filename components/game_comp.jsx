import React from 'react';
import Board from '../js/board';
import BoardComponent from './board_comp';

export default class Game extends React.Component {
  constructor (props) {
    super(props);
    this.state = { board: new Board };
    this.updateBoard = this.updateBoard.bind(this);
  }

  updateBoard (coords) {
    var board = this.state.board;
    var y = coords[0];
    var x = coords[1];

    board.scoreboard();
    if (!board.isOver()){
      if (board.currentMove === 1){
        board.considerFirstMove(coords);
        this.setState({ board: board });
      } else if (board.currentMove === 2){
        board.considerSecondMove(coords);
        this.setState({ board: board });
      }
    }

    this.setState({ board: board });
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
