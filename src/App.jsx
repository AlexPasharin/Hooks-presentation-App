import React, { useState, useEffect } from 'react'

import { getArtists, getTypes } from "../src/utils/dataGetters"
import Main from "./components/Entries/Main"

import './styles/App.css'

// const asyncFunc = async () => {
//   const [artists, types] = await Promise.all([
//     getArtists(),
//     getTypes()
//   ])

//   setArtists(artists)
//   setTypes(types)
// }

const AppFunc = () => {
  const [artists, setArtists] = useState(null)
  const [types, setTypes] = useState(null)

  useEffect(() => {
    Promise.all([
      getArtists(),
      getTypes()
    ]).then(([artists, types]) => {
      setArtists(artists)
      setTypes(types)
    })
  }, [])

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
