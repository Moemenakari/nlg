import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Next Level Games app', () => {
  render(<App />);
  // App should render without crashing
  expect(document.querySelector('body')).toBeInTheDocument();
});
