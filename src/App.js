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

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  onShelfChange (book, newShelf) {
    this.state.shelfs.map(shelf => {
      if (shelf.value === newShelf.target.value) {
        this.setState({books : this.state.books + book})
        BooksAPI.update(book, shelf.value).then(this.putBooksOnShelf())
        return true;
      } else {
        this.setState({ books: this.state.books.filter((element) => element !== book)})
      }
      return false;
    })
  }


  putBooksOnShelf() {
    BooksAPI.getAll().then(response => {
      this.setState({
        books: response
      });
    });
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/"render={() =>
            <BookList shelfs={this.state.shelfs}
              books={this.state.books}
              whenShelfChanges={this.onShelfChange}/>
          }/>

        <Route path="/addbook" render={() => <AddBook whenShelfChanges={this.onShelfChange} />}/>

      </div>
    )
  }
}

export default BooksApp
