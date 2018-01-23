import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'

import Loader from '../components/Loader'
import BookShelf from '../components/BookShelf'

class ListBooks extends Component {
  state = {
    loading: true,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({ loading: false, books })
      })
  }

  onChangeShelf(id, shelf) {
    BooksAPI.update({ id }, shelf)
      .then(() => this.setState((state) => ({
        books: state.books.map((book) => {
          if (book.id === id) book.shelf = shelf
          return book
        })
      })))
  }

  render() {
    const { loading, books } = this.state

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
              <BookShelf title={ 'Currently Reading' } shelf={ 'currentlyReading' } books={ books } onChangeShelf={ (id, shelf) => this.onChangeShelf(id, shelf) } />
              <BookShelf title={ 'Want to Read' } shelf={ 'wantToRead' } books={ books } onChangeShelf={ (id, shelf) => this.onChangeShelf(id, shelf) } />
              <BookShelf title={ 'Read' } shelf={ 'read' } books={ books } onChangeShelf={ (id, shelf) => this.onChangeShelf(id, shelf) } />
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
