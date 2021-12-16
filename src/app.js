const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

const geocode = require('../utils.js/geocode.js')
const forecast = require('../utils.js/forecast.js')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Tony'
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide a address'
        })
    }else{
        console.log(req.query.address)
        geocode(req.query.address, (error, {long, lat, location} = {}) => {
            if(error){
                return res.send({error})
            }
            forecast(long, lat, (error, forecastData) => {
                if(error){
                    return res.send({error})
                }
                console.log("Location: " + location)
                const obj = JSON.parse(JSON.stringify(forecastData.forecast)) 
                for(let i in obj){
                    console.log("Date: " + obj[i].date)
                    console.log("Forecast Tempature: " + obj[i].avgtemp + "°C")
                    return res.send({
                        location: location,
                        date: obj[i].date,
                        forecastTemp:  obj[i].avgtemp + "°C",
                        name: "Tony"
                    })
                }
            })    
        })
    }
    
})

app.get("/about", (req, res) => {
    res.render('about', {
        title : 'ABOUT PAGE',
        name: 'Tony'
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title : 'HELP PAGE',
        helpText: 'This is some helpful text',
        name: 'Tony'
    })
})

app.get("*", (req, res) => {
    res.send("404 page")
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

// Deploy to Heroku
// heroku keys:add
// heroku create yourappname
// git status
// git add .
// git commit
// git push
// git remote
// git push heroku master