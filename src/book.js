import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
}

  render() {
    const {book, onShelfChange} = this.props
    const noThumbLink = "https://books.google.com/googlebooks/images/no_cover_thumb.gif"
      return (
        <li key={book.id}>
          <div className='book'>
            <div className='book-top'>
              <div className='book-cover' style={{ width: 128,height: 193,backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : noThumbLink})`}}/>

              <div className='book-shelf-changer'>
                <select value={book.shelf ? book.shelf : "None" } onChange={event => {
                    event.preventDefault();
                    onShelfChange(book, event.target.value);
                  }}>
                  <option value='moveto' disabled>Move to...</option>
                  <option value='currentlyReading'>Currently Reading</option>
                  <option value='wantToRead'>Want to Read</option>
                  <option value='read'>Read</option>
                  <option value='none'>None</option>
                </select>
              </div>

            </div>
            <div className='book-title'>{book.title}</div>
            <div className='book-authors'>{book.authors}</div>
          </div>
        </li>
      )
    }
  }

  export default Book;
