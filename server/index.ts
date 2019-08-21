import fetch from 'node-fetch'
import server from './src/server'
import { URLSearchParams } from 'url'

// const fetchData = (URL, headers, method, body) =>
//   fetch(URL, {
//     method: method || 'GET',
//     body: body ? JSON.stringify(body) : undefined,
//     headers,
//     mode: 'cors'
//   })


const AUTH_URL = 'https://accounts.spotify.com/api/token'
const authToken = "Basic MmU4ZGFlZGY3NDYyNGM5MDllMzg4NTAxMzkzZWQ4OTY6Yjk0Zjc1YmJhYzFkNGMyZThhNDFhMzhmOTVmYTQ1YmY="


const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');

fetch(
  AUTH_URL, {
    headers: {
      Authorization: authToken
    },
    method: 'POST',
    body: params,
  }
)
  .then(response => {
    if (!response.ok) throw Error(response)
    return response.json()
  })
  .then(res => {
    console.log("Successfully obtained token")
    const { access_token, token_type } = res
    const auth_token = `${token_type} ${access_token}`
    console.log(auth_token)

    const app = server(auth_token)
    const PORT = 2000

    app.listen(PORT, err => {
      if (err) {
        console.log('Could not start the server ', err.stack)
        process.exit(1)
      }
      console.log(`Listening on port ${PORT}`)
    })

  }).catch('Could not get access token from Spotify')





