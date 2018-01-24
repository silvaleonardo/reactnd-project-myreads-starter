import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string,
    onChange: PropTypes.func.isRequired
  }

  static defaultProps = {
    shelf: 'none'
  }

  state = {
    options: [
      {
        label: 'Currently Reading',
        value: 'currentlyReading'
      },
      {
        label: 'Want to Read',
        value: 'wantToRead'
      },
      {
        label: 'Read',
        value: 'read'
      },
      {
        label: 'None',
        value: 'none'
      }
    ]
  }

  render() {
    const { shelf, onChange } = this.props
    const { options } = this.state

    return (
      <select value={ shelf } onChange={ (event) => onChange(event.target.value) }>
        <option value='' disabled>Move to...</option>

        { options.map(({ label, value }) => (
          <option key={ value } value={ value }>{ label }</option>
        )) }
      </select>
    )
  }
}

export default BookShelf
