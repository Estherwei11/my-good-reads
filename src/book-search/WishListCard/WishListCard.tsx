import React from 'react';
import Book from '../../shared/book/book';

interface WishListCardProps {
  book: Book;
  removeFromReadingWishList: (book: Book) => void;
}

// Each WishList element
const WishListCard = (props: WishListCardProps) => {
  const { book, removeFromReadingWishList } = props;
  const { volumeInfo } = book;

  const { title } = volumeInfo;

  return (
    <div className="reading-list-content">
      {title}
      <a
        className="reading-list-content__btn-close"
        onClick={() => {
          removeFromReadingWishList(book);
        }}
      >
        x
      </a>
    </div>
  );
};

export default WishListCard;
