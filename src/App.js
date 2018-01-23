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
    const { loading, books } = this.state;

    return (
      <div className='app'>
        <Route exact path='/' render={ () => (
          <ListBooks loading={ loading } books={ books } onChangeShelf={ (id, shelf) => this.onChangeShelf(id, shelf) } />
        ) } />

        <Route path='/search' component={ SearchBooks } />
      </div>
    )
  }
}

export default BooksApp
