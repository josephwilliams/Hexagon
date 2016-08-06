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
          <div className="example">
            <div className="current-player-container">
              <h5 style={{textShadow: "0px 0px 5px #ff0707"}}>
                red
              </h5>
            </div>
            <div className="tile-container">
              <div className="red-tile">
                <div className="gem-red">
                  <div className="shadow"></div>
                </div>
              </div>
            </div>
            <div className="current-player-container">
              <h5 style={{textShadow: "0px 0px 5px #07e2ff"}}>
                blue
              </h5>
            </div>
            <div className="tile-container">
              <div className="blue-tile">
                <div className="gem-blue">
                  <div className="shadow"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="rule">
            2. Click where you want to move your piece.
          </div>
          <div className="example">
            <div className="open-tile"></div>
            <div className="open-tile"></div>
            <div className="open-tile"></div>
          </div>
          <div className="rule">
            * You can 'Jump' two spaces, leaving your original space unmarked, or 'Slide' one space, keeping your original spot.
          </div>
          <div className="rule">
            ** After you jump or slide your gem, all adjacent opponent's gems will change to your color.
          </div>
          <div className="example">
            When there are no remaining moves, the winner is determined by gem count.
          </div>
        </div>
        <div className="footer" onClick={() => this.props.toggleModal()}>
          let's play!
        </div>
      </div>
    )
  }
}
