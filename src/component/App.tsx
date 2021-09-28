import { Component } from 'react';
import GameOptions from './GameOptions';
import PlayArea from './PlayArea';
import './App.scss';

export default class App extends Component {

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Tic-Tac-Toe
        </header>
        <GameOptions />
        <PlayArea />
      </div>
    );
  }

}
