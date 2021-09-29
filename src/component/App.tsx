import { Component } from 'react';
import GameOptions from './GameOptions';
import PlayArea from './PlayArea';
import './App.scss';

export type Options = {
  startingPlayer: PlayerType;
}
export enum PlayerType {
  X = 'X',
  O = 'O',
  NotPlayer = ''
}
export default class App extends Component<{}, Options> {

  constructor(props: any) {
    super(props);
    this.state = {
      startingPlayer: PlayerType.NotPlayer
    };
    this.bindFunctions();
  }

  private bindFunctions() {
    this.onOptionConfirmed = this.onOptionConfirmed.bind(this);
  }
  onOptionConfirmed(options: Options): void {
    this.setState(() => { return options; });
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Tic-Tac-Toe
        </header>
        <GameOptions onOptionConfirmed={this.onOptionConfirmed} />
        <PlayArea options={this.state} />
      </div>
    );
  }

}
