const mongoose = require('mongoose') 

const collectionSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    description: {
        type: String, require: true
    }, 
    games: [ 
        { 
            id: Number
        },
    ],
    
}) 

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection