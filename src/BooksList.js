import React from 'react';
import Bookshelf from './Bookshelf';

const BooksList = (props) => {
    const {
        shelves,
        books,
        onMoveBook
    } = props;

    return (<div className="list-books-content">
        {shelves.map(shelf => (
            <Bookshelf
                key={shelf.id}
                title={shelf.title}
                books={books.filter(book => book.shelf === shelf.id)}
                shelves={shelves}
                onMoveBook={onMoveBook}
            />
        ))}
    </div>);
};  
export default BooksList;