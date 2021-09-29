import { Component } from 'react';
import { Options } from './App';
import './PlayArea.scss';

type Box = {
    id: number;
    selectedBy: string;
}

type GameVariables = {
    boxes: Box[];
    currentPlayer: string;
    startingPlayer: string;
}
export default class PlayArea extends Component<{ options: Options }, GameVariables> {

    constructor(props: { options: Options }) {
        super(props);
        this.state = PlayArea.initState(props);
        this.onBoxClick = this.onBoxClick.bind(this);
    }

    static initState(props: { options: Options }): GameVariables {
        const output: GameVariables = {
            boxes: [],
            currentPlayer: props.options.startingPlayer,
            startingPlayer: props.options.startingPlayer
        }

        for (var i = 0; i < 9; i++) {
            output.boxes.push({ id: i, selectedBy: '' });
        }
        return output;
    }
    static getDerivedStateFromProps(props: { options: Options }, state: GameVariables): GameVariables {
        if (state.startingPlayer === props.options.startingPlayer) { return state; }
        return PlayArea.initState(props);
    }

    onBoxClick(e: any) {
        const targetBoxId = e.target.id;
        const newState: GameVariables = { ...this.state};
        newState.boxes[targetBoxId] = { ...newState.boxes[targetBoxId], selectedBy: newState.currentPlayer};
        newState.currentPlayer = this.state.currentPlayer === 'X' ? 'O' : 'X';
        this.setState(newState);
    }

    render() {
        return (
            <div className="play-area">
                <label>{this.state.currentPlayer}'s turn</label>
                <div className="game-container">
                    {this.state.boxes.map((box, i) => {
                        return (
                            <div key={box.id} id={i.toString()} className="box" onClick={this.onBoxClick}>
                                {box.selectedBy}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
