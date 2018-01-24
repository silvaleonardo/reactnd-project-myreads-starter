import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Loader from '../components/Loader'
import Error from '../components/Error'
import BookItem from '../components/BookItem'

class SearchBooks extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string,
    onChangeShelf: PropTypes.func.isRequired,
    onSearchBooks: PropTypes.func.isRequired
  }

  state = {
    query: '',
    debounce: null
  }

  componentWillUnmount() {
    this.props.onSearchBooks('')
  }

  queryChange(query) {
    this.setState({ query }, () => this.debounceSearch(query))
  }

  debounceSearch(query) {
    this.setState(({ debounce }) => {
      clearTimeout(debounce)

      return {
        debounce: setTimeout(() => this.props.onSearchBooks(query), 400)
      }
    })
  }

  render() {
    const { loading, books, error, onChangeShelf } = this.props
    const { query } = this.state

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
