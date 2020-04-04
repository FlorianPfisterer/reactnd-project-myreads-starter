import React from 'react';
import Book from './Book';

const Bookshelf = (props) => {
    const {
        title,
        books,
        shelves,
        onMoveBook
    } = props;

    return (<div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">
            {books.map((book) => (
                <li key={book.id}>
                    <Book
                        book={book}
                        shelves={shelves} 
                        onMoveBook={onMoveBook}
                    />
                </li>
            ))}
        </ol>
        </div>
    </div>);
};

export default Bookshelf;