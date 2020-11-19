import React from 'react';
import { render } from '@testing-library/react';
import BookSearch from './BookSearch';

describe('BookSearch - The main container', () => {
  it('should be created', () => {
    const { container } = render(<BookSearch />);
    expect(container).toBeTruthy();
  });

  it('should have a wish list', () => {
    const { container } = render(<BookSearch />);

    const wishlist = container.querySelector('.reading-list-container');
    expect(wishlist).toBeInTheDocument();
  });

  it('it should have an input bar', () => {
    const { container } = render(<BookSearch />);

    const inputBar = container.querySelector('input.full-width');
    expect(inputBar).toBeInTheDocument();
  });
});
