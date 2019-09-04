import React, { useReducer, useState } from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

const prevIndex = (arr, index) =>
  index === null ? 0 :
    index === 0 ? arr.length - 1 : index - 1

const nextIndex = (arr, index) =>
  index === null ? 0 :
    index === arr.length - 1 ? 0 : index + 1

const Entries = ({ entries }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET': return action.idx
      case 'PREV': return prevIndex(entries, state)
      case 'NEXT': return nextIndex(entries, state)
    }
  }

  const [selectedEntryIdx, dispatch] = useReducer(reducer, null)

  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  if (!entries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  const selectPrevEntry = () => dispatch({ type: 'PREV' })
  const selectNextEntry = () => dispatch({ type: 'NEXT' })

  return (
    <ul>
      {entries.map((e, idx) =>
        <Entry
          key={e.id}
          entry={e}
          selected={selectedEntryIdx === idx}
          select={() => dispatch({ type: 'SET', idx })}
          selectPrevEntry={selectPrevEntry}
          selectNextEntry={selectNextEntry}
        />)
      }
    </ul>
  )
}

export default Entries
