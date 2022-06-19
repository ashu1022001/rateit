import { render, screen } from '@testing-library/react';
import App from './App';
import "https://kit.fontawesome.com/fe838ae10b.js";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
