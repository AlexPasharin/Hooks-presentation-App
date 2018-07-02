window.onload = () => {
  const artistGroupList = document.getElementById('artist-list')

  // note - artistList.children is a live HTML collection, not array
  // [...] is an ES6 way to convert it to an array
  const artistGroups = [...artistGroupList.children]

  artistGroups.forEach(group => {
    const artistNodesList = group.getElementsByTagName('ul')[0]
    const artistGroupName = group.getElementsByTagName('h1')[0]

    artistGroupName.addEventListener('click', () => {
      if (artistNodesList.classList.contains('hidden')) {
        artistNodesList.classList.remove('hidden')
      } else {
        artistNodesList.classList.add('hidden')
      }
    })

    const artistNodes = [...artistNodesList.children]

    artistNodes.forEach(el => {
      const header = el.getElementsByTagName('h2')[0]
      const entryTypesEl = el.getElementsByClassName('entry-typies')[0]
      const {artistId} = el.dataset

      header.addEventListener('click', () => {
        if (!entryTypesEl.classList.contains('hidden')) {
          entryTypesEl.classList.add('hidden')
          return
        }

        getArtistsTypes(artistId)
          .then(types => {
            const typeList = document.createElement('ul')

            types.forEach(t => {
              const {id, name} = t
              const typeLi = document.createElement('li')
              const link = `http://localhost:2000/entries?type=${id}&artist=${artistId}`
              typeLi.innerHTML = `<a href="${link}">${name}s</a>`
              typeList.appendChild(typeLi)
            })

            const entryTypesElChildren = [...entryTypesEl.children]
            entryTypesElChildren.forEach(c => {
              entryTypesEl.removeChild(c)
            })

            entryTypesEl.appendChild(typeList)
            entryTypesEl.classList.remove('hidden')
          })
      })
    })
  })
}

const getArtistsTypes = (artistID) =>
  fetch(`/types?artist=${artistID}`)
    .then(data => data.json())
