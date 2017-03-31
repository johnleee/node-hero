'use strict'

const pg = require('pg')  
const conString = 'postgres://johnlee:password@localhost/node_hero' // make sure to match your own database's credentials

pg.connect(conString, function (err, client, done) {  
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows[0])
    process.exit(0)
  })
})