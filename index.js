// index.js
'use strict'

const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')

const app = express()

const pg = require('pg')  
const conString = 'postgres://johnlee:password@localhost/johnlee' // make sure to match your own database's credentials
//username:password@host/databasename
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  
app.set('views', path.join(__dirname, 'views')) 

app.get('/', (request, response) => {  
  response.render('home', {
    name: 'John'
  })
})


app.post('/users', function (req, res, next) {  
  const user = req.body

  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      done() //this done callback signals the pg driver that the connection can be closed or returned to the connection pool

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.send(200)
    })
  })
})

app.get('/users', function (req, res, next) {  
  pg.connect(conString, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      done()

      if (err) {
        // pass the error to the express error handler
        return next(err)
      }

      res.json(result.rows)
    })
  })
})

app.listen(3000)