import { Component } from 'react';
import { Options } from './App';


export default class PlayArea extends Component<{ options: Options }, Options> {

    constructor(props: any) {
        super(props);
        this.state = this.props.options;
    }

    render() {
        return (
            <div>
                <div >PlayArea</div>
                <div>{this.state.firstPlayer}</div>
            </div>
        );
    }
}
