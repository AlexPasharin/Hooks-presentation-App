import React, { useState, useEffect } from 'react'

import { getArtists, getTypes } from "../src/utils/dataGetters"
import Main from "./components/Entries/Main"

import './styles/App.css'


class App extends React.Component {
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

// here App is re-implemented in a functional style
const AppFunc = () => {
  const [artists, setArtists] = useState(null)
  const [types, setTypes] = useState(null)

  const asyncFunc = async () => {
    const [artists, types] = await Promise.all([
      getArtists(),
      getTypes()
    ])

    setArtists(artists)
    setTypes(types)
  }

  useEffect(() => {
    /*
      effect cannot be async function but you can call async function in an effect!
      the reason is that useEffec callback function is only allowed to return a function (or nothing)
      Functions defined with async await syntax return a Promise, which is not a function
    */
    asyncFunc()
  }, []) // empty dependencies array guarantees that event will fire only once, after the first render

  if (!artists || !types)
    return "Loading data..."

  return (
    <Main
      artists={artists}
      types={types}
    />
  );
}

export default AppFunc
