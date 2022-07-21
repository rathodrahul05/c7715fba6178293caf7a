import React from 'react';
import { render, screen } from '@testing-library/react';
import ParkingSpace from '../components/ParkingSpace';


test('renders learn react link', () => {
  render(<ParkingSpace />);
  const linkElement = screen.getByText(/Parking Lot/i);
  expect(linkElement).toBeInTheDocument();
});
