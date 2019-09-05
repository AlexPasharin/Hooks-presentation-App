import React, { useState, useEffect } from 'react'

import { getEntries } from "../../utils/dataGetters"
import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

// This is now completely re-implemented as a functional component MainFunc below
class Main extends React.Component {
  state = {
    selectedArtist: null,
    selectedType: null,
    entries: [],
  }

  /*
    This is how new records are fetched every time artist or record type changes
    in a class component
  */
  componentDidUpdate(prevProps, prevState) {
    const { selectedArtist: prevSelectedArtist, selectedType: prevSelectedType } = prevState
    const { selectedArtist, selectedType } = this.state

    if (
      selectedArtist !== prevSelectedArtist ||
      selectedType !== prevSelectedType
    ) {
      this.updateEntries()
    }
  }

  onSelectArtist = selectedArtist => {
    this.setState({ selectedArtist })
  }

  onSelectType = selectedType => {
    this.setState({ selectedType })
  }

  updateEntries = () => {
    const { selectedArtist, selectedType } = this.state

    if (!selectedArtist || !selectedType) {
      this.setState({ entries: [] })
    } else {
      this.setState({ entries: null })
      getEntries(selectedArtist, selectedType).then(
        entries => this.setState({ entries })
      )
    }

  }

  render() {
    const { artists, types } = this.props
    const { selectedArtist, selectedType, entries } = this.state

    return (
      <div className="main-content">
        <NavBar
          artists={artists}
          types={types}
          selectedArtist={selectedArtist}
          selectedType={selectedType}
          onSelectArtist={this.onSelectArtist}
          onSelectType={this.onSelectType}
        />
        <main>
          <Entries
            entries={entries}
          />
        </main>
      </div>
    )
  }
}

const MainFunc = ({ artists, types }) => {
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [entries, setEntries] = useState([])

  /*
    This is how new records are fetched every time artist or record type changes
    in a functional component
  */
  useEffect(
    // the effect function itself
    () => {
      if (!selectedArtist || !selectedType) {
        setEntries([])
      } else {
        setEntries(null)
        getEntries(selectedArtist, selectedType).then(setEntries)
      }
    },
    // array of dependencies which specify which values have to change in order for effect to fire
    [selectedArtist, selectedType]
  )

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
