import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Error.css'

class Error extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  }

  render() {
    const { message } = this.props

    return (
      <div className='error-message'>
        <span className='error-text'>{ message }</span>
      </div>
    )
  }
}

export default Error
