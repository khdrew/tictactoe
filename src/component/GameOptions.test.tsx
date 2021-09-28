import { render, screen } from '@testing-library/react';
import GameOptions from './GameOptions';

test('renders title text', () => {
  render(<GameOptions />);
  const title = screen.getByText(/Game Options/i);
  expect(title).toBeInTheDocument();
});


