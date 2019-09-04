import React, { useState } from 'react'

import Entry from './Entry'
import '../../styles/Entries.css'

const prevIndex = (arr, index) =>
  index === null ? 0 :
    index === 0 ? arr.length - 1 : index - 1

const nextIndex = (arr, index) =>
  index === null ? 0 :
    index === arr.length - 1 ? 0 : index + 1

const Entries = ({ entries }) => {
  const [selectedEntryIdx, setSelectedEntryIdx] = useState(null)

  if (!entries)
    return <div className="entry-list-empty">Loading data...</div>

  if (!entries.length)
    return <div className="entry-list-empty">No entries correspond to the search release</div>

  const selectPrevEntry = () => setSelectedEntryIdx(prevIndex(entries, selectedEntryIdx))
  const selectNextEntry = () => setSelectedEntryIdx(nextIndex(entries, selectedEntryIdx))

  return (
    <ul>
      {entries.map((e, idx) =>
        <Entry
          key={e.id}
          entry={e}
          selected={selectedEntryIdx === idx}
          select={() => setSelectedEntryIdx(idx)}
          selectPrevEntry={selectPrevEntry}
          selectNextEntry={selectNextEntry}
        />)
      }
    </ul>
  )
}

export default Entries
