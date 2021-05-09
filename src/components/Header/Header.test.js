import { render } from '@testing-library/react';
import Header from './index';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });
});
