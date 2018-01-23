import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Loader from '../components/Loader'
import BookShelf from '../components/BookShelf'

class ListBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const { loading, books, onChangeShelf } = this.props

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>
        <div className='list-books-content'>
          { loading ? (
            <Loader />
          ) : (
            <div>
              <BookShelf title={ 'Currently Reading' } shelf={ 'currentlyReading' } books={ books } onChangeShelf={ onChangeShelf } />
              <BookShelf title={ 'Want to Read' } shelf={ 'wantToRead' } books={ books } onChangeShelf={ onChangeShelf } />
              <BookShelf title={ 'Read' } shelf={ 'read' } books={ books } onChangeShelf={ onChangeShelf } />
            </div>
          ) }
        </div>
        <div className='open-search'>
          <Link to='/search'>Search a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
