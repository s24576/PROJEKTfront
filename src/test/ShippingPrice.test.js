import React from 'react';
import { render, screen } from '@testing-library/react';
import ShippingPrice from '../components/items/ShippingPrice';

test('renders correct shipping price when shipping1 is true', () => {
  const props = {
    price: 50,
    shipping1: true,
    shipping2: false,
  };

  render(<ShippingPrice {...props} />);

  const priceElement = screen.getByText(/cena: 50/i);
  const shippingElement = screen.getByText(/dostawa: 10/i);

  expect(priceElement).toBeInTheDocument();
  expect(shippingElement).toBeInTheDocument();
});

test('renders correct shipping price when shipping1 is false', () => {
  const props = {
    price: 50,
    shipping1: false,
    shipping2: true,
  };


  render(<ShippingPrice {...props} />);

  const priceElement = screen.getByText(/cena: 50/i);
  const shippingElement = screen.getByText(/dostawa: 20/i);

  expect(priceElement).toBeInTheDocument();
  expect(shippingElement).toBeInTheDocument();
});
