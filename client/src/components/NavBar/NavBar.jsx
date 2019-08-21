import React from 'react'

import Selector from './Selector'
import '../../styles/NavBar.css'

const NavBar = ({ artists, selectedArtist, onSelectArtist, types, selectedType, onSelectType }) => (
  <header className="app-header">
    <h1 className="app-header__title">Record Collection</h1>
    <div className="app-header__selectors" >
      {artists &&
        <Selector
          items={artists}
          selectedItem={selectedArtist}
          onSelect={onSelectArtist}
        />
      }
      {types &&
        <Selector
          items={types}
          selectedItem={selectedType}
          onSelect={onSelectType}
        />
      }
    </div>
  </header>
)

export default NavBar
