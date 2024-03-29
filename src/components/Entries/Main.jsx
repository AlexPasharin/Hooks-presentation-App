import React from 'react'

import { getEntries } from "../../utils/dataGetters"
import NavBar from '../NavBar/NavBar'
import Entries from './Entries'

class Main extends React.Component {
  state = {
    selectedArtist: null,
    selectedType: null,
    entries: [],
  }

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

export default Main
