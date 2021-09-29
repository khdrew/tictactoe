import { Component } from 'react';
import { Options, PlayerType } from './App';
import './PlayArea.scss';

type Box = {
    id: number;
    selectedBy: PlayerType;
}

type GameVariables = {
    boxes: Box[];
    currentPlayer: PlayerType;
    startingPlayer: PlayerType;
}

export default class PlayArea extends Component<{ options: Options }, GameVariables> {

    constructor(props: { options: Options }) {
        super(props);
        this.state = PlayArea.initState(props);
        this.onBoxClick = this.onBoxClick.bind(this);
        this.onResetGame = this.onResetGame.bind(this);
    }

    static initState(props: { options: Options }): GameVariables {
        const output: GameVariables = {
            boxes: [],
            currentPlayer: props.options.startingPlayer,
            startingPlayer: props.options.startingPlayer
        }

        for (var i = 0; i < 9; i++) {
            output.boxes.push({ id: i, selectedBy: PlayerType.NotPlayer });
        }
        return output;
    }

    static getDerivedStateFromProps(props: { options: Options }, state: GameVariables): GameVariables {
        if (state.startingPlayer === props.options.startingPlayer) { return state; }
        return PlayArea.initState(props);
    }

    onResetGame() {
        this.setState(PlayArea.initState(this.props));
    }

    onBoxClick(e: any) {
        // check if game started
        if (this.state.startingPlayer === PlayerType.NotPlayer) { return; }

        const targetBoxId = e.target.id;
        // check valid move
        if (!this.isValidMove(this.state.boxes, targetBoxId)) { return; }

        const newState: GameVariables = { ...this.state };
        newState.boxes[targetBoxId] = { ...newState.boxes[targetBoxId], selectedBy: newState.currentPlayer };
        newState.currentPlayer = this.state.currentPlayer === PlayerType.X ? PlayerType.O : PlayerType.X;

        this.setState(newState);
    }

    private isValidMove(boxes: Box[], targetMove: number) {
        return boxes[targetMove].selectedBy === PlayerType.NotPlayer;
    }

    render() {
        return (
            <div className="play-area">
                {(() => {
                    let instruction = '';
                    if (this.state.startingPlayer === PlayerType.NotPlayer) {
                        instruction = 'Select a starting symbol';
                    } else {
                        instruction = `It is currently ${this.state.currentPlayer}'s turn`;
                    }
                    return (<div className="game-instruction">{instruction}</div>);
                })()}
                <div className="game-container">
                    {this.state.boxes.map((box, i) => {
                        return (
                            <div key={box.id} id={i.toString()} className="box" onClick={this.onBoxClick}>
                                {box.selectedBy}
                            </div>
                        )
                    })}
                </div>
                <button onClick={this.onResetGame}>Reset Game</button>
            </div>
        );
    }
}
