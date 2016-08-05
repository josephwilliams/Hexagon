import React from 'react';
import Board from '../js/board';
import BoardComponent from './board_comp';

var Game = React.createClass ({
  getInitialState: function () {
    return ({ board: new Board });
  },

  updateBoard: function (coords) {
    var board = this.state.board;
    var y = coords[0];
    var x = coords[1];

    board.scoreboard();
    if (!board.isOver()){
      board.considerMove(coords);
    }

    this.setState({ board: board });
  },

  render: function () {
    return (
      <div className="game-container">
        <BoardComponent
          board={this.state.board}
          updateBoard={this.updateBoard}
        />
      </div>
    )
  }
});

module.exports = Game;
