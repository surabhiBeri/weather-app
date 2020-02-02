const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + address + '&key=aa0732befce34087996da79a382e011a&language=en&pretty=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.status.code !==200) {
            callback('Unable to find location. Try another search.',undefined)
        } else {
            callback(undefined, {
                latitude: body.results[0].geometry.lat,
                longitude: body.results[0].geometry.lng
            })
        }
    })
}

module.exports = geocode