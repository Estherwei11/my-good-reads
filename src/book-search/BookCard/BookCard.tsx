import React from 'react';
import Book from '../../shared/book/book';

interface BookCardProps {
  book: Book;
  isAddedToWishList: boolean;
  addToReadingWishList: (book: Book) => void;
}

const BookCard = (props: BookCardProps) => {
  const { book, isAddedToWishList, addToReadingWishList } = props;
  const { volumeInfo } = book;

  const {
    imageLinks,
    authors,
    title,
    publisher,
    publishedDate,
    description,
  } = volumeInfo;

  return (
    <article className="book-card">
      <header className="book-card__header">
         <div className="book-card__cover">
           {imageLinks && (
             <img src={imageLinks.thumbnail} alt={title} />
           )}
         </div>
        <div className="book-card__info">
           <p className="book-card__title">{title}</p>
           <p className="book-card__author">
             {authors ? authors.join(',') : ''}
           </p>
           <p className="book-card__publisher">
             {publisher ? publisher : ''}
           </p>
           <button
             className="btn-add-wishlist"
             disabled={isAddedToWishList}
             onClick={() => {
               addToReadingWishList(book);
             }}
           >
             {isAddedToWishList ? "ADDED TO WISHLIST" : "ADD TO WISHLIST"}
           </button>
         </div>
       </header>
       <p className="book-card__description">{description}</p>
    </article>
  )
};

export default BookCard;
