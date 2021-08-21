import React from 'react'

import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import { WANT_TO_READ, READ, CURRENTLY_READING } from './constants'
import { update } from './BooksAPI'

class SearchPage extends React.Component {

  state = {
    foundBooks: []
  }

  addFoundBooks = (foundBooks) => {
    this.setState({ foundBooks })
  }

  changeShelf = (book, newShelf) => {
    console.log('changeShelf called')
    update(book, newShelf).then((res) => {
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
    })
  }

  getBooksOnShelf = (books, shelf) => {
    const booksOnShelf = books.filter(book => book.shelf === shelf)
    console.log(booksOnShelf)
    return booksOnShelf
  }

  render() {
    return (
      <div>
        <SearchBooks searchBooks={this.addFoundBooks} />
        <BookShelf books={this.getBooksOnShelf(this.state.foundBooks, WANT_TO_READ.filter)} shelfName={WANT_TO_READ.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.getBooksOnShelf(this.state.foundBooks, CURRENTLY_READING.filter)} shelfName={CURRENTLY_READING.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.getBooksOnShelf(this.state.foundBooks, READ.filter)} shelfName={READ.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.state.foundBooks} onChangeShelf={this.changeShelf}/>
      </div>
    )
  }
}

export default SearchPage