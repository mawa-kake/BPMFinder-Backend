import express from 'express'
import morgan from 'morgan'
import {getTracks} from './spotifyFetch'

// Initialize http server
const app = express()

// Handle / route
app.get('/:query', (req, res) => {
    getTracks(req.params.query).then((data) => {res.send(data)})

}
)


app.use(morgan('combined'))

// Launch the server on port 3000
const server = app.listen(3000, () => {
    const { address, port } = server.address()
    console.log(`Listening at http://${address}:${port}`) //eslint-disable-line
});
