import * as express from 'express'
import fetch from 'node-fetch'

//const BASE_URL = 'https://api.spotify.com/v1/'

const artists = [
  {
    id: '1dfeR4HaWDbWqFHLkxsg1d',
    name: 'Queen',
  },
  {
    id: '3WrFJ7ztbogyGnTHbHJFl2',
    name: 'The Beatles',
  },
  {
    id: '3qm84nBOXUEQ2vnTfUTTFC',
    name: 'Guns N Roses'
  }
]

const types = [
  {
    name: "Albums",
    id: "album"
  },
  {
    name: "Singles",
    id: "single"
  },
  {
    name: "Compilations",
    id: "compilation"
  }
]

const successHandler = res => data => res.set("Access-Control-Allow-Origin", "*").json(data)

const errorHandler = (res, message: string) => err => {
  console.log(err.stack)
  res.status(500).send(message)
}

const server = access_token => {
  let app = express()

  app.use(express.json()) // for parsing application/json

  app.get('/rest/artists', (_, res) => {
    try {
      successHandler(res)(artists)
    } catch {
      errorHandler(res, 'Could not retrieve artists from the database')
    }
  }
  )

  app.get('/rest/types', (_, res) => {
    try {
      successHandler(res)(types)
    } catch {
      errorHandler(res, `Could not retrieve types from the database`)
    }
  })

  app.get('/rest/entries', (req, res) => {
    const { artistID, typeID } = req.query

    fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=${typeID}&country=GB`,
      {
        headers: {
          Authorization: access_token
        },
        method: 'GET'
      }
    ).then(response => {
      if (!response.ok) throw Error(response)

      return response.json()
    })
      .then(data => successHandler(res)(
        data.items.map(i => ({
          id: i.id,
          name: i.name,
          release_date: i.release_date
        }))
      ))
      .catch(errorHandler(res, `Could not retrieve entries from the database`))
  })

  app.get('/rest/tracks', (req, res) => {
    const { albumID } = req.query

    fetch(
      `https://api.spotify.com/v1/albums/${albumID}/tracks`,
      {
        headers: {
          Authorization: access_token
        },
        method: 'GET'
      }
    ).then(response => {
      if (!response.ok) throw Error(response)

      return response.json()
    })
      .then(data => successHandler(res)(
        data.items.map(i => ({
          id: i.id,
          name: i.name,
          track_number: i.track_number
        }))
      ))
      .catch(errorHandler(res, `Could not retrieve tracks`))
  })

  return app
}

export default server
