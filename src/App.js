import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

import ListBooks from './pages/ListBooks'
import SearchBooks from './pages/SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    loading: true,
    books: [],
    searchBooks: [],
    error: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => this.setState({ loading: false, books }))
  }

  onChangeShelf(changedBook) {
    BooksAPI.update(changedBook, changedBook.shelf)
      .then(() => this.setState((state) => ({
        books: ( state.books.find((book) => book.id === changedBook.id) ?
          state.books.map((book) => (book.id === changedBook.id ? changedBook : book)) :
          state.books.concat([ changedBook ])
        )
      })))
  }

  onSearchBooks(query) {
    this.setState({ loading: !!query, searchBooks: [], error: '' })

    if (query) {
      BooksAPI.search(query)
        .then((searchBooks) => {
          if (!Array.isArray(searchBooks)) {
            throw searchBooks
          }

          this.setState(({ books }) => ({
            loading: false,
            searchBooks: searchBooks.map((searchBook) => {
              books.forEach((book) => {
                if (searchBook.id === book.id) {
                  searchBook.shelf = book.shelf
                }
              })

              return searchBook
            })
          }))
        })
        .catch(({ error }) => this.setState({ loading: false, searchBooks: [], error: error || 'On error occurred please try again' }))
    }
  }

  render() {
    const { loading, books, searchBooks, error } = this.state

    return (
      <div className='app'>
        <Route exact path='/' render={ () => (
          <ListBooks loading={ loading } books={ books } onChangeShelf={ (book) => this.onChangeShelf(book) } />
        ) } />

        <Route path='/search' render={ () => (
          <SearchBooks loading={ loading } books={ searchBooks } error={ error } onSearchBooks={ (query) => this.onSearchBooks(query) } onChangeShelf={ (book) => this.onChangeShelf(book) } />
        ) } />
      </div>
    )
  }
}

export default BooksApp
