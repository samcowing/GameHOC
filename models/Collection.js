const mongoose = require('mongoose') 

const collectionSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    }, 
    owner: {
        type: String,
        required: true
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

