import { Component } from 'react';
import { Options } from './App';
import './PlayArea.scss';

type Box = {
    selectedBy: string;
}

type GameVariables = {
    boxes: Box[];
}
export default class PlayArea extends Component<{ options: Options }, GameVariables> {

    constructor(props: any) {
        super(props);
        const initialState: GameVariables = {
            boxes: []
        };
        for (var i = 0; i < 9; i++) {
            initialState.boxes.push({ selectedBy: '' });
        }
        this.state = initialState;
        this.setState(() => initialState);
    }

    render() {
        return (
            <div className="play-area">
                <div className="game-container">
                    {this.state.boxes.map((box, i) => {
                        return (
                            <div className="box">
                                {box.selectedBy}
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
