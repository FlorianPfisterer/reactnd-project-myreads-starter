import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BooksList from './BooksList';
import { shelves } from './shelves';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      books: [],
      searchedBooks: []
    };
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  onMoveBook = (updatedBook, newShelf) => {
    if (updatedBook.shelf === newShelf) { return; }

    BooksAPI.update(updatedBook, newShelf)
      .then(() => {
        const getNewBooks = (books) => {
          if (books.find(b => b.id === updatedBook.id)) {
            return books.map(b => ({ ...b, shelf: b.id === updatedBook.id ? newShelf : b.shelf }));
          } else {
            return books.concat([{ ...updatedBook, shelf: newShelf }]);
          }
        }

        this.setState(({ books }) => ({
          books: getNewBooks(books)
        }));
      });
  }

  onMoveSearchedBook = (book, newShelf) => {
    this.onMoveBook(book, newShelf);

    // also update the search list
    this.setState(({ searchedBooks }) => ({
      searchedBooks: searchedBooks.map(b => ({ ...b, shelf: b.id === book.id ? newShelf : b.shelf }))
    }));
  }

  onSearchBooks = (query) => {
    BooksAPI.search(query)
      .then((searchedBooks) => {
        if (!searchedBooks || searchedBooks.error) {
          console.log(searchedBooks.error);
          this.setState({ searchedBooks: [] });
        } else {
          this.setState(({ books }) => ({ searchedBooks: searchedBooks.map(book => ({
            ...book,
            shelf: books.find(b => b.id === book.id) ? books.find(b => b.id === book.id).shelf : book.shelf
          })) }));
        }
      });
  }

  render() {
    const { books, searchedBooks } = this.state;

    return (
      <div className="app">
         <BrowserRouter>
          <Route path='/search' render={() => (
            <SearchBooks 
              shelves={shelves}
              onSearchBooks={this.onSearchBooks}
              books={searchedBooks}
              onMoveBook={this.onMoveSearchedBook}
            />
          )} />
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BooksList
                books={books}
                shelves={shelves}
                onMoveBook={this.onMoveBook}
              />
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )} />
        </BrowserRouter>
      </div>
    )
  }
};

export default BooksApp;
