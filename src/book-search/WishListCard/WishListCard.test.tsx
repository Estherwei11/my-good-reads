import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WishListCard from './WishListCard';
import Book from '../shared/book/book';

const sampleBook: Book = {
  id: 'ptiYBAAAQBAJ',
  volumeInfo: {
    title: 'JavaScript & jQuery: The Missing Manual',
    authors: ['David Sawyer McFarland'],
    publisher: '"O\'Reilly Media, Inc."',
    publishedDate: '2014-09-18T00:00:00.000Z',
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=UAYvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=UAYvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    },
    description:
      'JavaScript lets you supercharge your HTML with animation, interactivity, and visual effects—but many web designers find the language hard to learn.',
  },
};

describe('WishListCard - Card for books in wishlist ', () => {
  it('should contains book title and a button to remove from wishlist', () => {
    const { title } = sampleBook.volumeInfo;

    const { container } = render(
      <WishListCard
        book={sampleBook}
        removeFromReadingWishList={(book) => {}}
      />
    );

    expect(screen.getByText(title)).toBeVisible();
    const button = container.querySelector('.reading-list-content__btn-close');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('x');
  });

  it('should have remove from reading wishlist function should be triggered when user click it', () => {
    const fn = jest.fn();
    const { container } = render(
      <WishListCard book={sampleBook} removeFromReadingWishList={fn} />
    );

    const button = container.querySelector('.reading-list-content__btn-close');

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
