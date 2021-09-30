import { render, screen } from '@testing-library/react';
import { Options, PlayerType } from './App';
import PlayArea from './PlayArea';

test('renders title text', () => {
    const state: Options = {
        startingPlayer: PlayerType.NotPlayer
    };
    render(<PlayArea options={state} />);
    const content = screen.getByText(/Select/i);
    expect(content).toBeInTheDocument();
});


