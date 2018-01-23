import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'

import ListBooks from './pages/ListBooks'
import SearchBooks from './pages/SearchBooks'
import './App.css'

class BooksApp extends React.Component {
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

  onChangeShelf(changedBook) {
    BooksAPI.update(changedBook, changedBook.shelf)
      .then(() => this.setState((state) => ({
        books: state.books.map((book) => (book.id === changedBook.id ? changedBook : book))
      })))
  }

  render() {
    const { loading, books } = this.state;

    return (
      <div className='app'>
        <Route exact path='/' render={ () => (
          <ListBooks loading={ loading } books={ books } onChangeShelf={ (book) => this.onChangeShelf(book) } />
        ) } />

        <Route path='/search' component={ SearchBooks } />
      </div>
    )
  }
}

export default BooksApp
