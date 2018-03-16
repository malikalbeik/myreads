import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from "prop-types";
import sortBy from 'sort-by'
import Book from './book'

class AddBook extends Component {
static propTypes = {
  onShelfChange: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
  };

  state = {
      query: '',
      books: [],
    }

    searchForBooks(query) {
        if (query) {
          BooksAPI.search(query.trim()).then(response => {
            let books = [];
            if (Array.isArray(response)) {
              books = response;
            }
            if (Array.isArray(response.books)) {
              books = response.books;
            }
            books.map((book) => {this.updateBookShelfFromLibraryBook(book);})
            this.setState({books});
          });
        } else {
          this.setState({books: []});
        }
      }


  updateBookShelfFromLibraryBook(book) {
    const {books} = this.props;
    const libraryBook = books.find((libraryBook) => (libraryBook.id === book.id));
    if (libraryBook) {
      book.shelf = libraryBook.shelf;
    } else {
      book.shelf = 'none';
    }
    return book;
  }

  updateQuery(query) {
    this.setState({ query });
    this.searchForBooks(query);
  }

  componentDidMount() {
    this.searchForBooks(this.state.query);
  }

  render() {
    const { query, books } = this.state
    const { onShelfChange } = this.props

    books.sort(sortBy('title'))
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              placeholder='Search by title or author'
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>

        <div className='search-books-results'>
          <ol className='books-grid'>
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onShelfChange={(book, shelf) => {
                  onShelfChange(book, shelf);
                  this.setState(status => ({
                    books: status.books.map(b => {
                      if (book.id === b.id) {
                        b.shelf = shelf;
                      }
                      return b;
                    })
                  }));
                }}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default AddBook
