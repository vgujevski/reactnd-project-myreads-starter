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
    this.setState({ foundBooks })

  }

  /**
   *  compare the users book collection against search results,
   *  return the books that are present in both lists
   */
  getMatchingBooks = (searchResults, usersCollection) => {
    const usersCollectionIDs = new Set()
    for (const item of searchResults) {
      usersCollectionIDs.add(item.id)
    }

    const matchingBooks = usersCollection.filter(resultItem => usersCollectionIDs.has(resultItem.id))
    return matchingBooks
  }

  getFoundCollectionBooks = (searchResults, usersCollection, shelfName) => {
    const matchingBooks = this.getMatchingBooks(searchResults, usersCollection)
    return this.props.getBooksOnShelf(matchingBooks, shelfName)
  }

  filterOutCollectionBooks = (searchResults, usersCollection) => {
    const usersCollectionIDs = new Set()
    for (const item of usersCollection) {
      usersCollectionIDs.add(item.id)
    }

    const matchingBooks = searchResults.filter(resultItem => !usersCollectionIDs.has(resultItem.id))
    return matchingBooks
  }

  render() {
    return (
      <div>
        <SearchBooks searchBooks={this.addFoundBooks} />

        {/** Users Collection */}
        <BookShelf
          books={this.getFoundCollectionBooks(this.state.foundBooks, this.props.books, CURRENTLY_READING.filter)}
          shelfName={CURRENTLY_READING.title}
          onChangeShelf={this.props.changeShelf} />
        <BookShelf
          books={this.getFoundCollectionBooks(this.state.foundBooks, this.props.books, WANT_TO_READ.filter)}
          shelfName={WANT_TO_READ.title}
          onChangeShelf={this.props.changeShelf} />
        <BookShelf
          books={this.getFoundCollectionBooks(this.state.foundBooks, this.props.books, READ.filter)}
          shelfName={READ.title}
          onChangeShelf={this.props.changeShelf} />
        {/** Search Results */}
        <BookShelf
          books={this.filterOutCollectionBooks(this.state.foundBooks, this.props.books)}
          onChangeShelf={this.props.changeShelf} />
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