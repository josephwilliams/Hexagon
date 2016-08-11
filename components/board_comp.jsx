import React from 'react';
import Modal from 'react-modal';
import ModalStyle from './help_modal_style';
import Instructions from './instructions_comp';
import Tile from './tile_comp';
import Scoreboard from './scoreboard_comp';
import Footer from './footer_comp';

export default class Board extends React.Component {
  constructor (props) {
    super(props);
    this.state = { modalIsOpen: false };
    this.toggleModal = this.toggleModal.bind(this);
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
    let newModalState = !this.state.modalIsOpen;
    this.setState({ modalIsOpen: newModalState });

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
          <Instructions toggleModal={this.toggleModal} />
        </Modal>
      )
    }

    return nodeModal;
  }

  whosTurn () {
    let currentColor = this.props.board.currentPlayer.color;
    var textShadow = (currentColor === 'Red') ? "0px 0px 5px #ff0707" : "0px 0px 5px #07e2ff";
    return (
      <div style={{textShadow: textShadow}}>
        {this.props.board.currentPlayer.color}
      </div>
    )
  }

  render () {
    return (
      <div className="board-container">
        {this.modalNode()}
        <div className="header-container">
          <h1>TETRAGON</h1>
        </div>
        <div className="current-player-container">
          <h5>
            {this.whosTurn()}
          </h5>
        </div>
        <Scoreboard redCount={this.props.board.redCount}
                    blueCount={this.props.board.blueCount}
                    message={this.props.board.message}
                    currentPlayer={this.props.board.currentPlayer}
        />
        <div className="how-container">
          <h5 onClick={() => this.toggleModal()}>
            how?
          </h5>
        </div>
        <div className="tiles-container">
          {this.showBoard()}
        </div>
        <Footer
          gameState={this.props.board.gameState}
          gameBegun={this.props.board.gameBegun}
          restart={this.props.restart}
        />
      </div>
    )
  }
}
