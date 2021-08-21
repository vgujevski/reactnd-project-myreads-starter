import React from 'react'
import PropTypes from 'prop-types'
import { WANT_TO_READ, READ, NONE, CURRENTLY_READING } from '../constants'

class ShelfChanger extends React.Component {

  handleChange = (book, e) => {
    this.props.onChangeShelf(book, e.target.value)
  }

  render() {
    const { book } = this.props

    const getValue = (book) => {
      if(book && book.shelf) {
        return book.self
      } else {
        return NONE.filter
      }
    }

    return (
      <div className="book-shelf-changer">
        <select value={getValue(book)} onChange={(e) => this.handleChange(book, e)}>
          <option value="move" disabled>Move to...</option>
          <option value={CURRENTLY_READING.filter}>Currently Reading</option>
          <option value={WANT_TO_READ.filter}>Want to Read</option>
          <option value={READ.filter}>Read</option>
          <option value={NONE.filter}>None</option>
        </select>
      </div>
    )
  }
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default ShelfChanger