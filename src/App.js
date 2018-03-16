import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import AddBook from './AddBook';
import BookList from './BookList';
import './App.css';


class BooksApp extends Component {

  constructor() {
    super();
      this.state = {
        books:[],
        shelfs:[
        {name: 'Currently Reading',
        value: 'currentlyReading'},
        {name: 'Want to Read',
        value: 'wantToRead'},
        {name: 'Read',
        value: 'read'}
      ]
    };
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  listBooks => () {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onShelfChange (book, newShelf) {
    BooksAPI.update(book, shelf).then(data => {
      this.setState(status => ({
        books: status.books.map(b => {
          if (book.id === b.id) {
            b.shelf = shelf;
          }
          return b;
        })
      }));
    });
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/"render={() =>
            <BookList
              books={this.state.books}
              whenShelfChanges={this.onShelfChange}
              listBooks={this.listBooks}/>
          }/>

        <Route path="/addbook" render={() => <AddBook whenShelfChanges={this.onShelfChange} books={books}/>}/>

      </div>
    )
  }
}

export default BooksApp
