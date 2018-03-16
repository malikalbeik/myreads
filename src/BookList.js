import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './shelf';

class BookList extends Component {
  static propTypes = {
  books: PropTypes.array.isRequired,
  moveBookToShelf: PropTypes.func.isRequired,
  listBooks: PropTypes.func.isRequired
}

  componentDidMount() {
    this.props.listBooks();
  }

  render() {

    const {books, whenShelfChanges} = this.props;
    const currentlyReading = books.filter((book) => book.shelf === 'currentlyReading');
    const wantToRead = books.filter((book) => book.shelf === 'wantToRead');
    const read = books.filter((book) => book.shelf === 'read');

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          <Shelf books={currentlyReading} whenShelfChanges={whenShelfChanges} title='Currently Reading'/>
          <Shelf books={wantToRead} whenShelfChanges={whenShelfChanges} title='Want To Read'/>
          <Shelf books={read} whenShelfChanges={whenShelfChanges} title='Read'/>
        </div>
        <div className='open-search'>
          <Link to='/addbook'>Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookList
