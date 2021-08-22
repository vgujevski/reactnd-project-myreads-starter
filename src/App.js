import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { getAll, update } from './BooksAPI';

import MainPage from './MainPage';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    getAll().then(result => {
      this.setState({
        books: result
      })
    })
  }

  changeShelf = (book, newShelf) => {
    this.setState((prevState) => ({
      books: prevState.books.map(stateBook => {
        if (stateBook.id === book.id) {
          return {
            ...stateBook,
            shelf: newShelf
          }
        } else {
          return stateBook
        }
      })
    }))
    console.log('changeShelf called')
    update(book, newShelf).then((res) => {
      console.log(JSON.stringify(res, null, 2))
    })
  }

  getBooksOnShelf = (books, shelf) => {
    return books.filter(book => book.shelf === shelf)
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/search">
              <SearchPage
                books={this.state.books}
                changeShelf={this.changeShelf}
                getBooksOnShelf={this.getBooksOnShelf} />
            </Route>
            <Route path="/">
              <MainPage
                books={this.state.books}
                changeShelf={this.changeShelf}
                getBooksOnShelf={this.getBooksOnShelf} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default BooksApp
