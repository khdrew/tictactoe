import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title text', () => {
  render(<App />);
  const title = screen.getByText(/Tic-Tac-Toe/i);
  expect(title).toBeInTheDocument();
});
