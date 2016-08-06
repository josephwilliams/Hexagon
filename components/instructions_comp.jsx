import React from 'react';

export default class Instructions extends React.Component {
  closeModal () {
    () => this.props.closeModal();
  }

  render () {
    return (
      <div className="instructions-container">
        <h1>TETRAGON</h1>
        <div className="header">
          how to play
        </div>
        <div className="content">
          <div className="rule">
            1. Click the piece you want to move.
          </div>
          <div className="rule">
            2. Click where you want to move your piece.
          </div>
          <div className="rule">
            * You can 'Jump' two spaces, leaving your original space unmarked, or 'Slide' one space, keeping your original spot.
          </div>
          <div className="rule">
            ** After you jump or slide your gem, all adjacent opponent's gems will change to your color.
          </div>
          <div className="rule">
            *** The dock above the game board tracks game actions and current player.
          </div>
        </div>
        <div className="footer" onClick={() => this.props.toggleModal()}>
          let's play!
        </div>
      </div>
    )
  }
}
