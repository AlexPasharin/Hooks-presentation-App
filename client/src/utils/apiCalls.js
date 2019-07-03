const BASE_URL = 'http://localhost:2000'

const fetchData = resource =>
  fetch(`${BASE_URL}/rest/${resource}`)
    .then(response => response.json())

export const fetchArtists = () => fetchData('artists')
export const fetchArtistTypes = artistID => fetchData(`types?artist=${artistID}`)
export const fetchEntries = (artistID, type) => fetchData(`entries?artist=${artistID}&type=${type}`)
export const fetchReleases = entryID => fetchData(`releases?entry=${entryID}`)
