import React from 'react'
import PropTypes from 'prop-types'

import SearchBooks from './components/SearchBooks'
import BookShelf from './components/BookShelf'
import { WANT_TO_READ, READ, CURRENTLY_READING, NONE } from './constants'

class SearchPage extends React.Component {

  state = {
    foundBooks: []
  }

  addFoundBooks = (foundBooks) => {
    const books = foundBooks.map(book => ({ ...book, shelf: NONE.filter }))
    console.log('books length: ', JSON.stringify(books.length, null, 2));
    this.setState({ foundBooks: books })
  }

  /**
   *  compare the users book collection against search results,
   *  return the books that are present in both lists
   */
  getMatchingBooks = (searchResults, usersCollection) => {
    const usersCollectionIDs = new Set()
    // searchResults.array.forEach((book) => {
    //   usersCollectionIDs.add(book.id)
    // })
    for (const book of searchResults) {
      usersCollectionIDs.add(book.id)
    }

    const matchingBooks = usersCollection.filter(resultItem => usersCollectionIDs.has(resultItem.id))
    return matchingBooks
  }

  // getFoundCollectionBooks = (searchResults, usersCollection, shelfName) => {
  //   const matchingBooks = this.getMatchingBooks(searchResults, usersCollection)
  //   return this.props.getBooksOnShelf(matchingBooks, shelfName)
  // }

  // filterOutCollectionBooks = (searchResults, usersCollection) => {
  //   const usersCollectionIDs = new Set()
  //   for (const item of usersCollection) {
  //     usersCollectionIDs.add(item.id)
  //   }

  //   const matchingBooks = searchResults.filter(resultItem => !usersCollectionIDs.has(resultItem.id))
  //   return matchingBooks
  // }

  changeFoundBookShelf = (book, newShelf) => {
    this.setState((prevState) => ({
      foundBooks: prevState.foundBooks.map(stateBook => {
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
    this.props.changeShelf(book, newShelf)
  }

  updateSearchResults = (foundBooks, usersCollection) => {
    const matchingBooks = this.getMatchingBooks(foundBooks, usersCollection)
  
    const updatedBooks = foundBooks.map(foundBook => {
      const exists = matchingBooks.find(b => foundBook.id == b.id)
      if(exists){
        foundBook.shelf = exists.shelf
      }
  
      return foundBook
    })
    return updatedBooks
  }

  render() {
    const books = this.updateSearchResults(this.state.foundBooks, this.props.books)

    return (
      <div>
        <SearchBooks searchBooks={this.addFoundBooks} />

        {/** Users Collection */}
        <BookShelf
          books={this.props.getBooksOnShelf(books, CURRENTLY_READING.filter)}
          shelfName={CURRENTLY_READING.title}
          onChangeShelf={this.changeFoundBookShelf} />
        <BookShelf
          books={this.props.getBooksOnShelf(this.state.foundBooks, WANT_TO_READ.filter)}
          shelfName={WANT_TO_READ.title}
          onChangeShelf={this.changeFoundBookShelf} />
        <BookShelf
          books={this.props.getBooksOnShelf(this.state.foundBooks, READ.filter)}
          shelfName={READ.title}
          onChangeShelf={this.changeFoundBookShelf} />
        {/** Search Results */}
        <BookShelf
          books={this.props.getBooksOnShelf(this.state.foundBooks, NONE.filter)}
          onChangeShelf={this.changeFoundBookShelf} />
      </div>
    )
  }
}

SearchPage.propTypes = {
  getBooksOnShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
}

export default SearchPage