import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

const SearchBooks = (props) => {
    const {
        onSearchBooks,
        books,
        shelves,
        onMoveBook
    } = props;

    return (<div className="search-books">
        <div className="search-books-bar">
            <Link to='/' className="close-search" >Close</Link>

            <div className="search-books-input-wrapper">        
            <input type="text" placeholder="Search by title or author" onChange={(e) => onSearchBooks(e.target.value)} />
            </div>
        </div>
        <div className="search-books-results">
            <ol className="books-grid">
                {books.map((book) => (
                    <Book
                        key={book.id}
                        book={book}
                        shelves={shelves}
                        onMoveBook={onMoveBook}
                    />
                ))}
            </ol>
        </div>
    </div>);
};

export default SearchBooks;