import React from 'react';
import BoardJS from '../js/board';
import Board from './board_comp';

class Game extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="game-container">
        <Board />
      </div>
    )
  }
}

export default Game;
