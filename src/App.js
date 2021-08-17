import React from 'react'
import './App.css'
import { get, getAll, update, search } from './BooksAPI'
import { WANT_TO_READ, READ, CURRENTLY_READING, NONE } from './constants'

import BookShelf from './components/BookShelf'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  getBooksOnShelf = (books, shelf) => {
    const booksOnShelf = books.filter(book => book.shelf === shelf)
    console.log(booksOnShelf) 
    return booksOnShelf
  }

  componentDidMount() {
    getAll().then(result => {
      this.setState({
        books: result
      })
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <BookShelf books={this.getBooksOnShelf(this.state.books, WANT_TO_READ.filter)} shelfName={WANT_TO_READ.title}/>
            <BookShelf books={this.getBooksOnShelf(this.state.books, CURRENTLY_READING.filter)} shelfName={CURRENTLY_READING.title}/>
            <BookShelf books={this.getBooksOnShelf(this.state.books, READ.filter)} shelfName={READ.title}/>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
