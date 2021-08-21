import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { WANT_TO_READ, READ, CURRENTLY_READING } from './constants'

import BookShelf from './components/BookShelf'

class MainPage extends React.Component {

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
            <BookShelf books={this.props.getBooksOnShelf(this.props.books, WANT_TO_READ.filter)} shelfName={WANT_TO_READ.title} onChangeShelf={this.props.changeShelf} />
            <BookShelf books={this.props.getBooksOnShelf(this.props.books, CURRENTLY_READING.filter)} shelfName={CURRENTLY_READING.title} onChangeShelf={this.props.changeShelf} />
            <BookShelf books={this.props.getBooksOnShelf(this.props.books, READ.filter)} shelfName={READ.title} onChangeShelf={this.props.changeShelf} />
          </div>
          <div className="open-search">
            <Link to="/search">Search</Link>
          </div>
        </div>
      </div>
    )
  }
}

MainPage.propTypes = {
  books: PropTypes.array.isRequired,
  changeShelf: PropTypes.func.isRequired,
  getBooksOnShelf: PropTypes.func.isRequired,
}

export default MainPage