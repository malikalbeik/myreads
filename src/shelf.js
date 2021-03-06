import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './book';

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const {books, title, onShelfChange} = this.props;
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map((book) => (<Book key={book.id} book={book} onShelfChange={onShelfChange}/>))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
