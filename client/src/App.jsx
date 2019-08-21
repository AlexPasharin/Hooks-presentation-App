import React from 'react'

import { getArtists, getTypes } from "../src/utils/dataGetters"
import Main from "./components/Entries/Main"

import './styles/App.css'

export default class App extends React.Component {
  state = {
    artists: null,
    types: null
  }

  async componentDidMount() {
    const [artists, types] = await Promise.all([
      getArtists(),
      getTypes()
    ])

    this.setState({
      artists,
      types,
    })
  }

  render() {
    const { artists, types } = this.state
    if (!artists || !types)
      return "Loading data..."

    return (
      <Main
        artists={artists}
        types={types}
      />
    );
  }
}
