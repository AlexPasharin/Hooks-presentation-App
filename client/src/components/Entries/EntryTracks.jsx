import React, { useState, useEffect } from 'react'
import { getTracks } from '../../utils/dataGetters'

const EntryTracks = ({ entryID }) => {
  const [tracks, setTracks] = useState(null)

  useEffect(() => {
    getTracks(entryID).then(setTracks)
  }, [])

  useEffect(() => {
    console.log("Mounting")

    return () => console.log("Unmounting")
  }, [])

  if (!tracks)
    return (
      <p className="tracks-view detail__title"> Loading tracks...</p>
    )

  return (
    <div className="tracks-view">
      <ul>
        {tracks.map(r =>
          (
            <li key={r.id}>{r.name}</li>
          )
        )}
      </ul>
    </div>
  )
}

export default EntryTracks

