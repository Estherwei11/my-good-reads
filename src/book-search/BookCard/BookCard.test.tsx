import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';
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

describe('BookCard - Card for books', () => {
  it('should contains book information', () => {
    const { title, authors, description } = sampleBook.volumeInfo;

    const { container } = render(
      <BookCard
        isAddedToWishList={false}
        book={sampleBook}
        addToReadingWishList={(sampleBook) => {}}
      />
    );

    const titleSection = container.querySelector('.book-card__title');
    const authorsSection = container.querySelector('.book-card__author');
    const descriptionSection = container.querySelector(
      '.book-card__description'
    );

    expect(titleSection).toBeInTheDocument();
    expect(titleSection).toHaveTextContent(title);

    expect(authorsSection).toBeInTheDocument();
    expect(authorsSection).toHaveTextContent(authors.join(', '));

    expect(descriptionSection).toBeInTheDocument();
    expect(descriptionSection).toHaveTextContent(description);
  });

  it('should have contains a button to add a book to wishlist', () => {
    const fn = jest.fn();
    const { container } = render(
      <BookCard
        isAddedToWishList={false}
        book={sampleBook}
        addToReadingWishList={fn}
      />
    );

    const button = container.querySelector('.btn-add-wishlist');

    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('will disable add wishlist button when isAddedToWishiList is false', () => {
    const fn = jest.fn();
    const { container } = render(
      <BookCard
        isAddedToWishList={true}
        book={sampleBook}
        addToReadingWishList={fn}
      />
    );

    const button = container.querySelector('.btn-add-wishlist');

    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
