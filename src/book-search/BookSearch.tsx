import React, { useEffect, useState } from 'react';
import { getBooksByType } from './book-search.service';
import BookCard from './BookCard/BookCard';
import WishListCard from './WishListCard/WishListCard';
import debounce from '../shared/debounce/debounce';
import Book from '../shared/book/book';

const BookSearch = () => {
  const [bookType, updateBookType] = useState('');
  const [bookTypeToSearch, updateBookTypeToSearch] = useState('');
  const [allAvailableBooks, setAllAvailableBooks] = useState<Book[]>([]);
  const [readingWishList, setReadingWishList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  async function requestBooks() {
    if (bookTypeToSearch) {
      setLoading(true);

      const allBooks = await getBooksByType(bookTypeToSearch);

      // check for possible undefined
      if (allBooks && allBooks.items) {
        setAllAvailableBooks(allBooks.items);
      } else {
        setAllAvailableBooks([]);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks();
    }

    getAllBooks();
  }, [bookTypeToSearch]);

  const debouncedUpdateBookTypeToSearch = debounce(updateBookTypeToSearch, 300);

  function addToReadingWishList(book: Book) {
    setReadingWishList((prev) => [...prev, book]);
  }

  function removeFromReadingWishList(book: Book) {
    setReadingWishList((prev) => prev.filter((b) => b.id !== book.id));
  }

  return (
    <>
      <div className="book--container">
        <div className="search-params">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBookTypeToSearch(bookType);
              }}
            >
              <input
                className="full-width"
                autoFocus
                name="gsearch"
                type="search"
                value={bookType}
                placeholder="Search for books to add to your reading list and press Enter"
                onChange={(e) => {
                  updateBookType(e.target.value);
                  debouncedUpdateBookTypeToSearch(e.target.value);
                }}
              />
            </form>
            {loading && <p>Please wait</p>}
            {!loading && !bookType && allAvailableBooks.length === 0 && (
              <div className="empty">
                <p>
                  Try searching for a topic, for example
                  <a
                    onClick={() => {
                      updateBookType('Javascript');
                    }}
                  >
                    {' '}
                    "Javascript"
                  </a>
                </p>
              </div>
            )}
            {/*  books start */}
            <div className="book-card-container">
              {!loading &&
                allAvailableBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    isAddedToWishList={
                      readingWishList.findIndex((b) => b.id === book.id) !== -1
                        ? true
                        : false
                    }
                    addToReadingWishList={addToReadingWishList}
                  />
                ))}
            </div>
            {/*  books end */}
          </div>
        </div>
        {/*  sidebar start */}
        <div className="sidebar">
          <div className="reading-list-container">
            <h2>My Reading WishList ({readingWishList.length})</h2>
            {readingWishList.map((book) => (
              <WishListCard
                key={book.id}
                book={book}
                removeFromReadingWishList={removeFromReadingWishList}
              />
            ))}
          </div>
        </div>
        {/*  sidebar end */}
      </div>
    </>
  );
};

export default BookSearch;
