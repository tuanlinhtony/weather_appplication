const request = require('postman-request')



const forecast = (long, lat, callback ) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=406a996f605dd6980a559610525a1a75&query='+ lat + "," + long + '&units=m'
    console.log(url)
    request({url, json: true},(error, { body }) => {
        if(error){
            callback("Unable to connect to weatherstack service!", undefined)
        }else if(body.error){
            callback("Unable to find this location weatherstack api. Try another location!", undefined)
        }else{
            callback(undefined, {
                placename : body.location.name,
                forecast : body.forecast
            })
        }
    })
}
module.exports = forecast

