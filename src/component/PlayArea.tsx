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
    winner: PlayerType;
}

export default class PlayArea extends Component<{ options: Options }, GameVariables> {

    static initGame(props: { options: Options }): GameVariables {
        const output: GameVariables = {
            boxes: [],
            currentPlayer: props.options.startingPlayer,
            startingPlayer: props.options.startingPlayer,
            winner: PlayerType.NotPlayer
        }

        for (var i = 0; i < 9; i++) {
            output.boxes.push({ id: i, selectedBy: PlayerType.NotPlayer });
        }
        return output;
    }

    static getDerivedStateFromProps(props: { options: Options }, state: GameVariables): GameVariables {
        if (state.startingPlayer === props.options.startingPlayer) { return state; }
        return PlayArea.initGame(props);
    }

    constructor(props: { options: Options }) {
        super(props);
        this.state = PlayArea.initGame(props);
        this.onResetGame = this.onResetGame.bind(this);
        this.onBoxClick = this.onBoxClick.bind(this);
    }

    onResetGame(e: any) {
        e.preventDefault();
        this.setState(PlayArea.initGame(this.props));
    }

    onBoxClick(e: any) {
        if (this.isGameStart(this.state)) { return; }
        if (this.isGameOver(this.state)) { return; }
        const targetBoxId = +e.target.id;
        if (!this.isValidMove(this.state.boxes, targetBoxId)) { return; }

        const newState: GameVariables = { ...this.state };
        newState.boxes[targetBoxId] = { ...newState.boxes[targetBoxId], selectedBy: newState.currentPlayer };
        newState.currentPlayer = this.state.currentPlayer === PlayerType.X ? PlayerType.O : PlayerType.X;

        this.setState(newState, () => this.checkGameOver(targetBoxId));
    }

    checkGameOver(move: number) {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        // get combo related to move
        const relevantCombos = winningCombos.filter(combo => combo.includes(+move));

        // check win
        const targetPlayer = this.state.boxes[move].selectedBy;
        if (!!relevantCombos.find(combo => combo.filter(i => this.state.boxes[i].selectedBy === targetPlayer).length === 3)) {
            this.setState({ ...this.state, winner: targetPlayer });
        }
    }

    private isValidMove(boxes: Box[], targetMove: number): boolean {
        return boxes[targetMove].selectedBy === PlayerType.NotPlayer;
    }

    private isGameStart(gameVars: GameVariables): boolean {
        return gameVars.startingPlayer === PlayerType.NotPlayer;
    }

    private isGameOver(gameVars: GameVariables): boolean {
        return gameVars.winner !== PlayerType.NotPlayer;
    }

    render() {
        return (
            <div className="play-area">
                {(() => {
                    let instruction = '';
                    if (this.state.startingPlayer === PlayerType.NotPlayer) {
                        instruction = 'Select a starting symbol';
                    } else if (this.state.winner === PlayerType.NotPlayer) {
                        instruction = `It is currently ${this.state.currentPlayer}'s turn`;
                    } else {
                        instruction = `${this.state.winner} has won!!!`;
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
                <button className="btn btn-primary" onClick={this.onResetGame}>Reset Game</button>
            </div>
        );
    }
}
