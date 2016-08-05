import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './help_modal_style';
import Instructions from './instructions_comp';
import Tile from './tile_comp';
import GameMessage from './game_message_comp';
import Scoreboard from './scoreboard_comp';

export default class Board extends React.Component {
  constructor (props) {
    super(props);
    this.state = { modalIsOpen: false };
  }

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

  toggleModal () {
    console.log('working');
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
    if (this.state.modalIsOpen)
      ModalStyle.content.opacity = '0';
  }

  onModalOpen () {
    ModalStyle.content.opacity = '1';
  }

  modalNode () {
    var nodeModal = null;
    if (this.state.modalIsOpen) {
      nodeModal = (
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.toggleModal}
          onAfterOpen={this.onModalOpen}
          style={ModalStyle}
         >
          <Instructions />
        </Modal>
      )
    }

    return nodeModal;
  }

  render () {
    return (
      <div className="board-container">
        {this.modalNode()}
        <Scoreboard redCount={this.props.board.redCount}
                    blueCount={this.props.board.blueCount}
                    message={this.props.board.message}
                    currentPlayer={this.props.board.currentPlayer}
        />
        <div className="help-button">
          <h5 onClick={() => this.toggleModal()}>
            how to play
          </h5>
        </div>
        <div className="tiles-container">
          {this.showBoard()}
        </div>
      </div>
    )
  }
}
