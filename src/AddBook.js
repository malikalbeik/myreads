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
