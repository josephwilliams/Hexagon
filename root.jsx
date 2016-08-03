import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game';

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
  ReactDOM.render(<App />, root)
});
