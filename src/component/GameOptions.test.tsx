import { render, screen } from '@testing-library/react';
import GameOptions from './GameOptions';

function onOptionConfirmedFn(o: any) { console.log(o); }

test('renders title text', () => {
  render(<GameOptions onOptionConfirmed={onOptionConfirmedFn} />);
  const title = screen.getByText(/Game Options/i);
  expect(title).toBeInTheDocument();
});


