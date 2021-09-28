import { Component } from 'react';
import { Options } from './App';
import './GameOptions.scss';

type AppProps = {
    onOptionConfirmed: (o: Options) => void;
}
export default class GameOptions extends Component<AppProps, Options> {

    private get firstPlayer(): string {
        return this.state.firstPlayer;
    }
    private onOptionConfirmed: (o: Options) => void;


    readonly options: string[] = ['O', 'X'];

    constructor(props: AppProps) {
        super(props);
        this.state = { firstPlayer: '' };

        this.onOptionConfirmed = this.props.onOptionConfirmed;

    }

    onFirstPlayerChange: any = (e: any) => {
        const newState = { firstPlayer: e.target.value };
        this.setState(() => newState, () => {
            this.onOptionConfirmed(newState)
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
                        return <label className="option" key={i.toString()}>
                            <input type="radio" name="firstPlayer" value={op} onChange={this.onFirstPlayerChange} />
                            <div className={`box ${this.firstPlayer === op ? 'selected' : ''}`}>{op}</div>
                        </label>
                    })}
                </div>
            </form>
        );
    }
}
