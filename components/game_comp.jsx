import React, {Component} from 'react';
import Board from '../js/board';
import BoardComponent from './board_comp';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { board: new Board };
    console.log(this);
  }

  updateBoard (coords) {
    console.log('working')
    console.log(this.state.board)
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
