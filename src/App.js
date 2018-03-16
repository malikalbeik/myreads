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
        books:[]
    };
    this.onShelfChange = this.onShelfChange.bind(this);
  }

  listBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onShelfChange (book, newShelf) {
    BooksAPI.update(book, newShelf).then(data => {
      this.setState(status => ({
        books: status.books.map(b => {
          if (book.id === b.id) {
            b.shelf = newShelf;
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
              onShelfChange={this.onShelfChange}
              listBooks={this.listBooks}/>
          }/>

        <Route path="/addbook" render={() => <AddBook onShelfChange={this.onShelfChange} books={this.state.books}/>}/>

      </div>
    )
  }
}

export default BooksApp
