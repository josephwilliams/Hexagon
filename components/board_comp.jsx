import React from 'react';
import Tile from './tile_comp';
import GameMessage from './game_message_comp';
import Scoreboard from './scoreboard_comp';

export default class Board extends React.Component {
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
        <Scoreboard redCount={this.props.board.redCount}
                    blueCount={this.props.board.blueCount}
                    />
        <GameMessage message={this.props.board.message}
                     currentPlayer={this.props.board.currentPlayer}
                     />
        <div className="tiles-container">
          {this.showBoard()}
        </div>
      </div>
    )
  }
}
