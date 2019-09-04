const BASE_URL = 'http://localhost:2000'

const fetchData = (resource, method, body, headers) =>
  fetch(`${BASE_URL}/rest/${resource}`, {
    method: method || 'GET',
    body: body ? JSON.stringify(body) : undefined,
    headers
  })
    .then(response => response.json())


export const fetchArtists = () => fetchData('artists')
export const fetchTypes = () => fetchData('types')
export const fetchEntries = (artistID, typeID) => fetchData(`entries?artistID=${artistID}&typeID=${typeID}`)
export const fetchTracks = albumID => fetchData(`tracks?albumID=${albumID}`)

export const fetchArtistTypes = artistID => fetchData(`types?artist=${artistID}`)
export const fetchReleases = entryID => fetchData(`releases?entry=${entryID}`)
