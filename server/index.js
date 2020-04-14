const MongoClient = require('mongodb').MongoClient
const io = require('socket.io')(3001)

const url = 'mongodb://localhost:27017'
const dbName = 'food-bot'

function createCollection (db, label) {
  db.createCollection(label, function (err, result) {
    if (err) throw err
    console.log(`💾 ${label} collection is created`)
  })
}

MongoClient.connect(url, function (err, client) {
  console.log('\n')

  if (err) {
    console.log('no server')
    return
  }

  const db = client.db(dbName)

  createCollection(db, 'victuals')
  createCollection(db, 'dishs')
  createCollection(db, 'schedules')

  io.on('connection', function (socket) {
    console.log('🛀 client connected')

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

    // SCHEDULES
    function pushSchedules () {
      db.collection('schedules')
        .find({}).toArray((err, docs) => {
          if (err) {
            console.log(err)
          } else {
            io.emit('push-schedules', docs)
          }
        })
    }

    socket.on('add-schedule', (datum, cb) => {
      db.collection('schedules')
        .updateOne(
          { id: datum.id },
          { $set: datum },
          { upsert: true },
          (err, res) => {
            cb(err, res)
            pushSchedules()
          })
    })

    socket.on('delete-schedule', (datum, cb) => {
      db.collection('schedules')
        .deleteOne({ id: datum.id },
          (err, res) => {
            console.log(err, res)
            cb(err, res)
            pushSchedules()
          })
    })

    socket.on('get-schedules', (cb) => {
      db.collection('schedules')
        .find({}).toArray((err, docs) => {
          cb(err, docs)
        })
    })
  })
})
