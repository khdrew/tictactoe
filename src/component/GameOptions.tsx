import { Component } from 'react';
import { Options } from './App';
import './GameOptions.scss';

type AppProps = {
    onOptionConfirmed: (o: Options) => void;
}
export default class GameOptions extends Component<AppProps, Options> {

    private get firstPlayer(): string {
        return this.state.startingPlayer;
    }
    private onOptionConfirmed: (o: Options) => void;


    readonly options: string[] = ['O', 'X'];

    constructor(props: AppProps) {
        super(props);
        this.state = { startingPlayer: '' };

        this.onOptionConfirmed = this.props.onOptionConfirmed;
    }

    onStartingPlayerChange: any = (e: any) => {
        const newState = { startingPlayer: e.target.value };
        this.setState(() => newState, () => {
            this.onOptionConfirmed(this.state)
        });
    }

    render() {
        return (
            <form>
                Game Options
                <div>
                    Select who goes first:
                </div>
                <div className="options">
                    {this.options.map((op, i) => {
                        return <label className={`option ${this.firstPlayer === op ? 'selected' : ''}`} key={i.toString()}>
                            <input type="radio" name="firstPlayer" value={op} onChange={this.onStartingPlayerChange} />
                            <div className="box">{op}</div>
                        </label>
                    })}
                </div>
            </form>
        );
    }
}
