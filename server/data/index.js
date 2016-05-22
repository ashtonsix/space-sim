import morgan from 'morgan'
import express from 'express'

const {PORT} = process.env

express().
  use(morgan('dev')).
  use('/api/data/solar-system', (req, res) =>
    res.send([
      {name: 'sun', size: 800},
      {name: 'mercury', size: 2},
      {name: 'venus', size: 3},
      {name: 'earth', size: 5},
      {name: 'mars', size: 4},
      {name: 'saturn', size: 80},
      {name: 'jupiter', size: 100},
      {name: 'uranus', size: 70},
      {name: 'neptune', size: 50},
      {name: 'pluto', size: 1},
    ])).
  listen(
    PORT, 'localhost',
    err => console.log(err || `Listening at http://localhost:${PORT}`))
