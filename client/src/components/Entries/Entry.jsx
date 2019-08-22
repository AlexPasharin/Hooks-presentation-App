import React, { Component, createRef } from 'react'
import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'

import EntryTracks from "./EntryTracks"

export default class Entry extends Component {
  state = {
    open: false,
    tracks: null
  }

  el = createRef()
  buttonEl = createRef()

  async componentDidUpdate(prevProps, prevState) {
    if (!prevProps.selected && this.props.selected) {
      this.el.current.focus()
    }

    if (!prevState.open && this.state.open) {
      this.el.current.scrollIntoView()
    }

    if (!prevState.tracks && this.state.tracks) {
      this.el.current.scrollIntoView()
    }
  }

  toggleTracksBlock = async () => {
    if (this.state.open) {
      this.setState({
        open: false,
        releases: null
      })
    } else {
      this.setState({
        open: true,
      })
    }
  }

  onKeyDown = e => {
    e.preventDefault()

    const { key } = e

    if (key === 'ArrowUp') {
      if (!this.state.open) {
        this.props.selectPrevEntry()
      }
    } else if (key === 'ArrowDown') {
      if (!this.state.open) {
        this.props.selectNextEntry()
      }
    } else if (key === "Enter") {
      this.toggleTracksBlock()
    }
  }

  onFocus = () => {
    if (!this.props.selected)
      this.props.select()
  }


  render() {
    const { entry, selected } = this.props
    const { open } = this.state
    const { name, release_date, id } = entry

    return (
      <li
        tabIndex="0"
        ref={this.el}
        className={classList("entry-block", { open, selected }, ["no-focus-outline"])}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}

      >
        <div className="entry-block__details"
          onClick={this.toggleTracksBlock}
        >
          <h2>{name} </h2>
          <p>
            <span className="detail__title">Release date: </span>
            {formatDate(release_date)}
          </p>
        </div>
        {open && <EntryTracks entryID={id} />}
      </li>
    )
  }
}
