const request = require("request")

const geocodefun = (location, callback) => {
    const geocodurl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

    request({ url: geocodurl, json: true }, (error, response) => {
        if (error) {
            callback(error, undefined)
        } else if (response.body.message) {
            callback(response.body.message, undefined)
        } else if (response.body.features == 0) {
            callback("LOCATION NOT FOUND", undefined)
        } else {
            callback(undefined, {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                city : response.body.features[0].text
            })
        }
    })
}




module.exports = {
    geocodefun
}





