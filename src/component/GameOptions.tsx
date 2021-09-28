import { Component } from 'react';
import './GameOptions.scss';

type AppState = {
    firstPlayer: string;
}

export default class GameOptions extends Component<{}, AppState> {

    private get firstPlayer(): string {
        return this.state.firstPlayer;
    }

    readonly options: string[] = ['O', 'X'];

    constructor(props: any) {
        super(props);
        this.state = { firstPlayer: '' };
    }

    onFirstPlayerChange: any = (e: any) => {
        console.log(e);
        this.setState({ ...this.state, firstPlayer: e.target.value })
        console.log(this.firstPlayer);
    }

    render() {
        return (
            <form>
                Game Options
                <div>
                    Select who goes first:
                </div>
                <div className="options">
                    {this.options.map((op) => {
                        return <label className="option">
                            <input type="radio" name="firstPlayer" value={op} onChange={this.onFirstPlayerChange} />
                            <div className={`box ${this.firstPlayer === op ? 'selected' : ''}`}>{op}</div>
                        </label>
                    })}
                </div>
            </form>
        );
    }
}
