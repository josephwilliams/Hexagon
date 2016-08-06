import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Game from './components/game_comp';

class App extends React.Component {
  render () {
    return (
      <div className="content">
        <Game />
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  Modal.setAppElement(document.body);
  ReactDOM.render(<App />, root)
});
