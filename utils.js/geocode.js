const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoidHVhbmxpbmh0b255IiwiYSI6ImNrd2tsNWtzYzF0NXAzMXFieG1lamUya24ifQ.qUIQEWeJj3b3-QZBZjXjdQ'
    console.log(url)
    request({url, json: true},(error, { body }) => {
        // if can't connect
        if(error){
            callback("Unable to connect to mapbox service!", undefined)
        }else if(body.features.length === 0){
            callback("Unable to find this location at mapbox api. Try another location!", undefined)
        }else{
            callback(undefined, {
                lat : body.features[0].center[1],
                long : body.features[0].center[0],
                location : body.features[0].place_name,
            })
        }
    })
}

// geocode("Hanoi",(error, data)=>{
//     console.log("Error", error)
//     console.log("Data", data)
// })

module.exports = geocode







