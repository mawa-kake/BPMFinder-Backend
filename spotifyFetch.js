import Api from "./api"
import _ from 'lodash'
import base64 from 'base-64'

let accessHeader = null
//Gets JSON
const getData = (trackName) => {
    //get tracks then shape the data
    return Api.get(`https://api.spotify.com/v1/search?q=${trackName + "&type=track"}`, null, accessHeader)
}

//Turns JSON into what I can work with
const shapeData = (trackJSON) => {
    let tracks = []

    const trackList = trackJSON.tracks.items
    const size = trackList.length
    let count = 0
    return new Promise((resolve,reject) => {
        _.forEach(trackList, function(track) {
            //shape data, add bpm for each track, then dispatch to store
            Api.get("https://api.spotify.com/v1/audio-features/" + track.id, null, accessHeader).then( json => {
                count++

                const x = {
                    name: track.name,
                    bpm: json.tempo,
                    key: track.id,
                    artist: track.artists[0].name
                }

                tracks.push(x)
                if (count === size) {

                    resolve(tracks)
                }
            }).catch((err) => {console.log("shapeData Failed") //eslint-disable-line no-console
                return err})

        })
    })
}

export const getTracks = (songName) => {
    const client_id = 'e1b3a4cc8dc34524b3235860a58784d4'
    const client_secret = 'd17c7fa7c362464fb7ca92aa2e0deff5'
    const header = {"Authorization" : 'Basic ' + (base64.encode(client_id + ':' + client_secret)).toString(),'Content-Type':'application/x-www-form-urlencoded'}

    //Get access token then get tracks
    return new Promise((resolve) => {
        Api.post("https://accounts.spotify.com/api/token", "grant_type=client_credentials", header).then(
            json => {
                const accessToken = json.access_token
                accessHeader = {"Authorization" : "Bearer " + accessToken}
                getData(songName).then(
                    data => {
                        shapeData(data).then(
                            tracks => resolve(tracks))})



            })
    })


}
