import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfName ? this.props.shelfName : ''}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map(book => (
                <Book key={book.id} book={book} onChangeShelf={this.props.onChangeShelf}/>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  shelfName: PropTypes.string,
  onChangeShelf: PropTypes.func.isRequired,
}

export default BookShelf