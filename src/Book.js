import React from 'react';

const Book = (props) => {
    const { book, shelves } = props;
    const {
        title, 
        shelf,
        authors,
        imageLinks
    } = book;

    return (<div className="book">
        <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks.thumbnail}")` }}></div>
        <div className="book-shelf-changer">
            <select value={shelf} onChange={(e) => console.log(e.target.value)}>
                <option value="move" disabled>Move to...</option>
                {shelves.map(shelf => (
                    <option key={shelf.id} value={shelf.id}>{shelf.title}</option>
                ))}
                <option value="none">None</option>
            </select>
        </div>
        </div>
        <div className="book-title">{title}</div>
    <div className="book-authors">{authors.join(', ')}</div>
    </div>);
};

export default Book;