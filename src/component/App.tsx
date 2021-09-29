import { Component } from 'react';
import GameOptions from './GameOptions';
import PlayArea from './PlayArea';
import './App.scss';

export type Options = {
  firstPlayer: string;
}
export default class App extends Component<{}, Options> {

  constructor(props: any) {
    super(props);
    this.state = {
      firstPlayer: ''
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
