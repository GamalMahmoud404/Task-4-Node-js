const { error } = require("console")
const request = require("request")

const forecustfun = (longtitude, latitude, callback) => {

    const url = "https://api.weatherapi.com/v1/current.json?key=9dc2f56d5d1d4b499ef182209241607&q=" + latitude + "," + longtitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("SITE NOT FOUND", undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
            callback(undefined, {
                country: response.body.location.country,
                temp: response.body.current.temp_c,
                condition: response.body.current.condition.text,
                dateTime: response.body.current.last_updated
            })
        }
    })
}


module.exports = {
    forecustfun
}






