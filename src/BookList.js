import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class BookList extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {this.props.shelfs.map(shelf => {
            var shelfsBooks = this.props.books.filter(book => book.shelf === shelf.value);
            if (shelfsBooks.length !== 0) {
              return (
                <div className="bookshelf" key={shelf.value}>
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {shelfsBooks.map((book) => {
                        return (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128,height: 193,backgroundImage: "url(" + book.imageLinks.thumbnail + ")"}}></div>
                                <div className="book-shelf-changer">
                                  <select
                                    value={book.shelf}
                                    onChange={event => this.props.whenShelfChanges(book, event)}>

                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </div>
              )
            } else {
              return(
                <div className="bookshelf" key={shelf.value}>
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <p>You have no books on this shelf, Please <Link to='/addbook'>Add</Link> some</p>
                  </div>
                </div>
              )
            }
          })}
        </div>
        <div className="open-search">
          <Link to='/addbook'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default BookList
