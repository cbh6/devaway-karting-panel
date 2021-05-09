import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ranking link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Ranking/i);
  expect(linkElement).toBeInTheDocument();
});
