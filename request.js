const path = require('path')  
const express = require('express')  
const rp = require('request-promise')  
const exphbs = require('express-handlebars')

const app = express()

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req, res) => {  
  rp({
    uri: 'http://apidev.accuweather.com/locations/v1/search',
    qs: {
      q: req.params.city,
      apiKey: 'hoArfRosT1215'
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
        console.log(data)
        
      var dataString = JSON.stringify(data)
      //var dataObj = JSON.parse(dataString)
      //console.log(dataObj)
      //console.log(dataObj[0].Version)
       
      res.render('request',  {
        response: dataString
  })
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000)