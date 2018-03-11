import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from 'react-router-dom';
import AddBook from './AddBook';
import BookList from './BookList';
import './App.css';


class BooksApp extends Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/"render={() =>
            <BookList shelfs={this.state.shelfs}
              books={this.state.books}
              whenShelfChanges={this.onShelfChange}/>
          }/>

        <Route path="/addbook" render={() => <AddBook />}/>

      </div>
    )
  }
}

export default BooksApp
