import React from 'react'

import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import { WANT_TO_READ, READ, CURRENTLY_READING } from './constants'
import { update, getAll } from './BooksAPI'

// TODO keep two different states for books found in search and for books o=in collection
class SearchPage extends React.Component {

  state = {
    foundBooks: [],
    books: [],
  }

  addFoundBooks = () => {

  }

  addBooks = (foundBooks) => {
    this.setState({ foundBooks })
  }

  componentDidMount() {
    // TODO 
    // getAll().then(result => {
    //   this.setState({
    //     books: result
    //   })
    // })
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
        <SearchBooks searchBooks={this.addBooks} />
        <BookShelf books={this.getBooksOnShelf(this.state.books, WANT_TO_READ.filter)} shelfName={WANT_TO_READ.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.getBooksOnShelf(this.state.books, CURRENTLY_READING.filter)} shelfName={CURRENTLY_READING.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.getBooksOnShelf(this.state.books, READ.filter)} shelfName={READ.title} onChangeShelf={this.changeShelf} />
        <BookShelf books={this.state.foundBooks} onChangeShelf={this.changeShelf}/>

      </div>
    )
  }
}

export default SearchPage