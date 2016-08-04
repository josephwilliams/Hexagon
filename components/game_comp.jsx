import React, {Component} from 'react';
import Board from '../js/board';
import BoardComponent from './board_comp';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board };
  }

  updateBoard (coords) {
    console.log('working')
    console.log(this)
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
