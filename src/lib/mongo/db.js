const mongoose = require('mongoose')
const { connectionString } = require('../../.credentails/development.json')

if (!connectionString) {
    console.error('MongoDB connection String 이 존재하지 않습니다.')
    process.exit(1)
}

mongoose.connect(connectionString)

const db = mongoose.connection

db.on('error', err => {
    console.error('MongoDB error :', err.message)
    process.exit(1)
})

db.once('open', () => console.log('Mongo DB connection 성공'))