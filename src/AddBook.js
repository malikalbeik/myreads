import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { Debounce } from "react-throttle";
import PropTypes from "prop-types";
import sortBy from 'sort-by'

class AddBook extends Component {
static propTypes = {
  resultBooks: PropTypes.array,
  shelfedBooks: PropTypes.array
  };

state = {
  resultBooks: [],
  shelfedBooks: []
}

componentDidMount() {
  BooksAPI.getAll().then((books) => {
    // Get rid of all other properties except book id and book shlef
    const booksId = books.map(book => ({ id: book.id,shelf: book.shelf }))
    this.setState({ shelfedBooks: booksId })
  })
}


getBooks(query) {


  // Check if query is not empty
  if (query) {
    BooksAPI.search(query.trim()).then(books => {
      // if BooksAPI doesn't give an empty array error and then setting the state.
      if (!books.error  || books) {
        // setting the state.
        this.setState({resultBooks: books})
      } else { // if BooksAPI gives an error set the resultBooks to an empty array.
        this.setState({resultBooks: []})
        }
    }).catch(err => console.log(err)) // error handling for BooksAPI.search()

    // if query is empty sets the resultBooks to an empty array.
  } else {
      this.setState({resultBooks: []})
  }


}
addBookFromSearch(book, shelf) {
  const newBooks = []
    BooksAPI.update(book, shelf).then(books => {
      Object.keys(books).forEach(shelf => {
          return books[shelf].map(id => ({ id: id, shelf: shelf})).forEach(book => {
            newBooks.push(book)
          })
        })
        return newBooks
    }).then(newBooks => {
      this.setState({ shelfedBooks: newBooks})
    })

}


  render() {
    this.state.resultBooks.sort(sortBy('title'));
    let booksList

    // check if resultBooks is not empty
    if (this.state.resultBooks.length > 0) {
      booksList = this.state.resultBooks.map((book) => {
        this.state.shelfedBooks.forEach(shelfedBook => {
          // check if the book at hand is also available in the search if so set the book's shelf.
          if(shelfedBook.id === book.id) {
            book.shelf = shelfedBook.shelf
          }
        })

        return (
            <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128,height: 193,backgroundImage: "url(" + book.imageLinks.thumbnail + ")"}}></div>
                      <div className="book-shelf-changer">
                        <select
                          value={book.shelf ? book.shelf : "Move to..."}
                          onChange={event => this.addBookFromSearch(book, event.target.value)}>

                          <option value="none" disabled >Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                        </select>
                      </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
            </li>
          )
      })
    }


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <Debounce time="100" handler="onChange">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => {this.getBooks(event.target.value)} }
                />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksList}
          </ol>
        </div>
      </div>
    )
  }

}

export default AddBook
