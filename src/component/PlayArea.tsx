import { Component } from 'react';
import { Options } from './App';

type Box = {
    selectedBy: string;
}

type GameVariables = {
    boxes: Box[];
}
export default class PlayArea extends Component<{ options: Options }, GameVariables> {

    constructor(props: any) {
        super(props);
        this.state = {
            boxes: []
        };
        for (var i = 0; i < 9; i++) {
            this.state.boxes.push({ selectedBy: '_'});
        }
    }

    render() {
        return (
            <div className="game-container">
                {this.state.boxes.map((box, i) => {
                    <div className="box">{box.selectedBy}</div>
                })}
            </div>
        );
    }
}
