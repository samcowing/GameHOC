const mongoose = require('mongoose') 

const collectionSchema = new mongoose.Schema({
    title: {
        type: String, require: true
    },
    description: {
        type: String
    }, 
    games: [
        { 
            id: String,
            name: String,
            image: String
        },
    ],
    
}, { timestamps: true }) 

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection

