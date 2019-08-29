import React, { useState, useEffect } from 'react'

import { getEntries } from "../../utils/dataGetters"
import NavBar from '../NavBar/NavBar'
import Entries from './Entries'


const MainFunc = ({ artists, types }) => {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!selectedArtist || !selectedType) {
      setEntries([])
    } else {
      setEntries(null)
      getEntries(selectedArtist, selectedType).then(setEntries)
    }
  }, [selectedArtist, selectedType])


  return (
    <div className="main-content">
      <NavBar
        artists={artists}
        types={types}
        selectedArtist={selectedArtist}
        selectedType={selectedType}
        onSelectArtist={setSelectedArtist}
        onSelectType={setSelectedType}
      />
      <main>
        <Entries
          entries={entries}
        />
      </main>
    </div>
  )


}

export default MainFunc
