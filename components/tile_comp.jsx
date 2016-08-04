import React from 'react';

class Tile extends React.Component {
  render () {
    var tileState;
    var gemClass;
    if (this.props.tileState === null){
      tileState = 'null-tile';
      gemClass = "no-gem";
    } else if (this.props.tileState === false){
      tileState = 'open-tile';
      gemClass = "no-gem";
    } else if (this.props.tileState === 1){
      tileState = "red-tile";
      gemClass = "gem-red";
    } else if (this.props.tileState === 2){
      tileState = "blue-tile";
      gemClass = "gem-blue";
    } else if (this.props.tileState === "open"){
      tileState = "glow-tile";
      gemClass = "no-gem"
    }

    return(
      <div className="tile-container">
        <div className={tileState}>
          <div className={gemClass}>
            <div className="shadow"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tile;
