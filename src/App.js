import React from 'react';
// import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BooksList from './BooksList';

class BooksApp extends React.Component {
  render() {
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
              <BooksList />
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
