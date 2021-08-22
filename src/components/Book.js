import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  render() {
    const { book } = this.props

    const printAuthors = (authorsList) => {
      return authorsList.join(", ")
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <ShelfChanger book={book} onChangeShelf={this.props.onChangeShelf}/>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{printAuthors(book.authors)}</div>
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  onChangeShelf: PropTypes.func.isRequired,
}

export default Book