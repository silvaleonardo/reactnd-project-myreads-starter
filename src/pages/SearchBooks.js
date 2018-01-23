import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Loader from '../components/Loader'
import Error from '../components/Error'
import BookItem from '../components/BookItem'

class SearchBooks extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    searchBooks: PropTypes.func.isRequired
  }

  state = {
    loading: false,
    query: '',
    books: [],
    error: ''
  }

  queryChange(query) {
    const { searchBooks } = this.props;

    this.setState({
      loading: !!query,
      error: '',
      books: [],
      query
    })

    if (query) {
      searchBooks(query)
        .then((books) => this.setState({ loading: false, books: books || [] }))
        .catch(() => this.setState({ loading: false, books: [], error: 'On error occurred please try again' }))
    }
  }

  render() {
    const { onChangeShelf } = this.props
    const { loading, query, books, error } = this.state

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input type='text' placeholder='Search by title or author' value={ query } onChange={ (event) => this.queryChange(event.target.value) }/>
          </div>
        </div>
        <div className='search-books-results'>
          { loading ? (
            <Loader />
          ) : (
            error ? (
              <Error message={ error } />
            ) : (
              <ol className='books-grid'>
                { books.map((book) => (
                  <li key={ book.id }>
                    <BookItem book={ book } onChangeShelf={ onChangeShelf } />
                  </li>
                )) }
              </ol>
            )
          ) }
        </div>
      </div>
    )
  }
}

export default SearchBooks
