import React from 'react';

// ending up merging this into the ScoreBoard component
export default class GameMessage extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="game-message-container">
        {this.props.message}
      </div>
    )
  }
}
