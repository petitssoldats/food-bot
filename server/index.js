const MongoClient = require('mongodb').MongoClient
const io = require('socket.io')(3001)

const url = 'mongodb://localhost:27017'
const dbName = 'food-bot'

MongoClient.connect(url, function (err, client) {
  console.log('\n')

  if (err) {
    console.log('no server')
    return
  }

  const db = client.db(dbName)

  db.createCollection('victuals', function (err, result) {
    if (err) throw err
    console.log('✦ Victuals collection is created')
  })

  db.createCollection('dishs', function (err, result) {
    if (err) throw err
    console.log('✦ Dishs collection is created')
  })

  io.on('connection', function (socket) {
    console.log('✦ client connected')

    // VICTUALS
    function pushVictuals () {
      db.collection('victuals')
        .find({}).toArray((err, docs) => {
          if (err) {
            console.log(err)
          } else {
            io.emit('push-victuals', docs)
          }
        })
    }

    socket.on('get-victuals', (cb) => {
      db.collection('victuals')
        .find({}).toArray((err, docs) => {
          cb(err, docs)
        })
    })

    socket.on('add-victual', (datum, cb) => {
      db.collection('victuals')
        .updateOne(
          { id: datum.id },
          { $set: datum },
          { upsert: true },
          (err, res) => {
            cb(err, res)
            pushVictuals()
          })
    })

    socket.on('delete-victual', (datum, cb) => {
      db.collection('victuals')
        .deleteOne({ id: datum.id },
          (err, res) => {
            console.log(err, res)
            cb(err, res)
            pushVictuals()
          })
    })

    socket.on('get-victuals', (cb) => {
      db.collection('victuals')
        .find({}).toArray((err, docs) => {
          cb(err, docs)
        })
    })

    // DISHS
    function pushDishs () {
      db.collection('dishs')
        .find({}).toArray((err, docs) => {
          if (err) {
            console.log(err)
          } else {
            io.emit('push-dishs', docs)
          }
        })
    }

    socket.on('add-dish', (datum, cb) => {
      db.collection('dishs')
        .updateOne(
          { id: datum.id },
          { $set: datum },
          { upsert: true },
          (err, res) => {
            cb(err, res)
            pushDishs()
          })
    })

    socket.on('delete-dish', (datum, cb) => {
      db.collection('dishs')
        .deleteOne({ id: datum.id },
          (err, res) => {
            console.log(err, res)
            cb(err, res)
            pushDishs()
          })
    })

    socket.on('get-dishs', (cb) => {
      db.collection('dishs')
        .find({}).toArray((err, docs) => {
          cb(err, docs)
        })
    })
  })
})
