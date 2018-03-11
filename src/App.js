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
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
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
