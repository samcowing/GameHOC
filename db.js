const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://samcowing:tVismov64iDC56Db@cluster0.jyvo0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI)
const db = mongoose.connection
db.on('connected', ()=>console.log('connected to mongoDB'+MONGODB_URI))


db.on('open' , ()=>{})

module.exports = db