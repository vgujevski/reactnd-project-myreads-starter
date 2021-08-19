import React from 'react'
import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'

import { update } from './BooksAPI'

class SearchPage extends React.Component {

  state = {
    books: []
  }

  addBooks = (books) => {
    console.log('addBooks called with: ', JSON.stringify(books, null, 2));
    this.setState({ books })
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
      console.log(JSON.stringify(res, null, 2))
    })
  }

  render() {
    return (
      <div>
        <SearchBooks searchBooks={this.addBooks} />
        <BookShelf books={this.state.books} onChangeShelf={this.changeShelf}/>
      </div>
    )
  }
}

export default SearchPage