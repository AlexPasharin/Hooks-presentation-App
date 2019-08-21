import * as api from './apiCalls'
import { sortBy, sortByReleaseDate } from './dataHelpers'

export const getArtists = () => api.fetchArtists().then(sortBy('name'))
export const getTypes = () => api.fetchTypes()

export const getEntries = (artist, type) =>
  api.fetchEntries(artist.id, type.id)
    .then(sortByReleaseDate)

export const getTracks = albumID =>
  api.fetchTracks(albumID).then(tracks => tracks.sort((a, b) => a.track_number < b.track_number))
