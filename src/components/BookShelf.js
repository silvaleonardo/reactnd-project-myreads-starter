import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BookItem from './BookItem'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { title, shelf, books, onChangeShelf } = this.props

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{ title }</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            { books.filter((book) => book.shelf === shelf).map((book) => (
              <li key={ book.id }>
                <BookItem book={ book } onChangeShelf={ onChangeShelf } />
              </li>
            )) }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
