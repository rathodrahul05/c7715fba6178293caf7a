import React from 'react';
import { render, screen } from '@testing-library/react';

import ParkingCharge from '../components/ParkingCharge';


test('renders learn react link', () => {
  render(<ParkingCharge openModal={true} />);
  const linkElement = screen.getByText(/Parking Charge/i);
  expect(linkElement).toBeInTheDocument();
});
