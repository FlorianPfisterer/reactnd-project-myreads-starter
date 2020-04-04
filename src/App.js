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
      books: []
    };
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">
         <BrowserRouter>
          <Route path='/search' render={() => (
            <SearchBooks />
          )} />
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BooksList books={books} shelves={shelves} />
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
