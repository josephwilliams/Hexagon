import React from 'react';

class Tile extends React.Component {
  render () {
    var tileState;
    var gemDisplay = "none";
    if (this.props.tileState === null){
      tileState = 'null-tile';
      gemDisplay = "none";
    } else if (this.props.tileState === false){
      tileState = 'open-tile';
      gemDisplay = "none";
    } else if (this.props.tileState === "red"){
      tileState = "red-tile";
      gemDisplay = "block";
    } else if (this.props.tileState === "blue"){
      tileState = "blue-tile";
      gemDisplay = "block";
    }

    return(
      <div className="tile-container">
        <div className={tileState}>
          <div className="gem" style={{display: gemDisplay}}>
            <div className="shadow"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Tile;
