import React, { useState, useRef, useLayoutEffect } from 'react'
import { formatDate } from '../../utils/dataHelpers'
import { classList } from '../../utils/classList'

import EntryTracks from "./EntryTracks"

const EntryFunc = ({ entry, selected, selectPrevEntry, selectNextEntry, select }) => {
  const [open, setOpen] = useState(false)
  const { name, release_date, id } = entry

  const el = useRef()

  useLayoutEffect(() => {
    if (selected) el.current.focus()
  }, [selected])

  useLayoutEffect(() => {
    if (open) el.current.scrollIntoView()
  }, [open])

  const toggleTracksBlock = () => {
    setOpen(prevState => !prevState)
  }

  const onKeyDown = e => {
    e.preventDefault()

    const { key } = e

    if (key === 'ArrowUp') {
      if (!open) {
        selectPrevEntry()
      }
    } else if (key === 'ArrowDown') {
      if (!open) {
        selectNextEntry()
      }
    } else if (key === "Enter") {
      toggleTracksBlock()
    }
  }

  const onFocus = () => {
    if (!selected)
      select()
  }

  return (
    <li
      tabIndex="0"
      ref={el}
      className={classList("entry-block", { open, selected }, ["no-focus-outline"])}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      <div className="entry-block__details"
        onClick={toggleTracksBlock}
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

export default EntryFunc
