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
      firstPlayer: 'M'
    };
  }

  onOptionConfirmed(options: Options) {
    console.log(this.state, options);
    this.setState(() => options);
  }


  render() {
    return (
      <div className="app">
        <header className="app-header">
          Tic-Tac-Toe
        </header>
        <GameOptions onOptionConfirmed={this.onOptionConfirmed} />
        <PlayArea options={ this.state } />
      </div>
    );
  }

}
