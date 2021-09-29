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
    winPosition?: WinPos;
}

enum WinPos {
    row0 = 'row-0',
    row1 = 'row-1',
    row2 = 'row-2',
    col0 = 'col-0',
    col1 = 'col-1',
    col2 = 'col-2',
    diagMaj = 'diag-maj',
    diagMin = 'diag-min'
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
            { condition: [0, 1, 2], pos: WinPos.row0 },
            { condition: [3, 4, 5], pos: WinPos.row1 },
            { condition: [6, 7, 8], pos: WinPos.row2 },
            { condition: [0, 3, 6], pos: WinPos.col0 },
            { condition: [1, 4, 7], pos: WinPos.col1 },
            { condition: [2, 5, 8], pos: WinPos.col2 },
            { condition: [0, 4, 8], pos: WinPos.diagMaj },
            { condition: [2, 4, 6], pos: WinPos.diagMin }
        ];
        // get combo related to move
        const relevantCombos = winningCombos.filter(combo => combo.condition.includes(+move));

        // check win
        const targetPlayer = this.state.boxes[move].selectedBy;
        const winCondition = relevantCombos.find(combo => combo.condition.filter(i => this.state.boxes[i].selectedBy === targetPlayer).length === 3)
        if (!!winCondition) {
            this.setState({ ...this.state, winner: targetPlayer, winPosition: winCondition.pos });
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
                    <div className="game-field">
                        {this.state.boxes.map((box, i) => {
                            return (
                                <div key={box.id} id={i.toString()} className="box" onClick={this.onBoxClick}>
                                    {box.selectedBy}
                                </div>
                            )
                        })}
                    </div>
                    {(() => {
                        if (this.state.winner === PlayerType.NotPlayer) { return; }
                        return <span className={`win-strike ${this.state.winPosition}`}></span>
                    })()}
                </div>
                <button className="btn btn-primary" onClick={this.onResetGame}>Reset Game</button>
            </div>
        );
    }
}
