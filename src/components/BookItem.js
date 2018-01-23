import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SelectShelf from './SelectShelf'

class BookItem extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string).isRequired,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string.isRequired
      }).isRequired,
      shelf: PropTypes.string.isRequired
    }).isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  onChangeBookShelf(selected) {
    const { book, onChangeShelf } = this.props

    book.shelf = selected

    onChangeShelf(book)
  }

  render() {
    const { book: { title, authors, imageLinks: { smallThumbnail }, shelf } } = this.props

    return (
      <div className='book'>
        <div className='book-top'>
          <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url(${ smallThumbnail })` }}></div>
          <div className='book-shelf-changer'>
            <SelectShelf shelf={ shelf } onChange={ (selected) => this.onChangeBookShelf(selected) } />
          </div>
        </div>
        <div className='book-title'>{ title }</div>
        <div className='book-authors'>{ authors.join(', ') }</div>
      </div>
    )
  }
}

export default BookItem
