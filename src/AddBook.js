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
