import React from 'react';

export default class Instructions extends React.Component {
  closeModal () {
    () => this.props.closeModal();
  }

  render () {
    return (
      <div className="instructions-container">
        <div className="header">
          how to play
        </div>
        <div className="content">
          <div className="rule">
            1. do this
          </div>
          <div className="rule">
            2. do that
          </div>
          <div className="rule">
            3. do other things
          </div>
        </div>
        <div className="footer">
          got it!
        </div>
      </div>
    )
  }
}
