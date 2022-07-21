import React from 'react';
import { render, screen } from '@testing-library/react';
import ParkingSpace from '../components/ParkingSpace';
import AddCarREgistration from '../components/AddCarREgistration';


test('renders learn react link', () => {
  render(<AddCarREgistration open={true} />);
  const linkElement = screen.getByText(/Add New Car/i);
  expect(linkElement).toBeInTheDocument();
});
