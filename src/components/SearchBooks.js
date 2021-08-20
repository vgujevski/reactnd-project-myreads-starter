import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


import { search } from '../BooksAPI'

class SearchBooks extends React.Component {

  handleChange = (e) => {
    console.log('handleChange called with: ', e.target.value);
    if (e.target.value === '') {
      this.props.searchBooks([])
    } else {
      search(e.target.value).then(result => {
        if (result && result.error) {
          console.log(JSON.stringify(result, null, 2));
          this.props.searchBooks([])
        } else {
          this.props.searchBooks(this.validateBooks(result))
        }
      })
    }
  }

  filterBooksWithoutAuthors = (books) => {
    let filteredBooks = []
    if (books) {
      filteredBooks = books.filter(book => Boolean(book.authors))
    }
    return filteredBooks
  }

  filterBooksWithoutImageLinks = (books) => {
    let filteredBooks = []
    if (books) {
      filteredBooks = books.filter(book => Boolean(book.imageLinks))
    }
    return filteredBooks
  }

  validateBooks = (books) => {
    const validBooks = this.filterBooksWithoutAuthors(this.filterBooksWithoutImageLinks(books))
    return validBooks
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Back</Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input type="text" placeholder="Search by title or author" onChange={this.handleChange} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

SearchBooks.propTypes = {
  searchBooks: PropTypes.func.isRequired
}

export default SearchBooks