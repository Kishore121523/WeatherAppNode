const path = require('path')
const express = require("express");
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Creatin express app
const app = express();

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log("Server is up on" + port);
// });

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Kishore'
  })
})

app.get('/about', (req,res) => {
  res.render('about', {
    title: 'About me',
    name: 'Kishore than ingayum'
  })
})
app.get('/help', (req,res) => {
  res.render("help", {
    helpText: "In the help page",
    title: "Help page",
    name: "Kishore"
  });
})

// api 
app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error:'Please provide the address'
    })
  }

  geocode(req.query.address, (error, {latitude,longitude, location} = {}) => {
      if(error){
        return res.send({
          error:error
        })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if(error){
          return res.send({
            error:error
          })
        }

        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      })
  })
})

// Should be at last always
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Kishore",
    errorMessage: "Help article not found",
  });
});
app.get('*', (req,res) => {
  res.render('404', {
    title:'404',
    name: 'Kishore',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, ()=>{
  console.log("Server on 3000.")
})