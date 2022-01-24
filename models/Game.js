const mongoose = require('mongoose') 

const gameSchema = new mongoose.Schema({
    id: {
        type: Number, require: true
    },
    slug: {
        type: String, require: true
    },
    name: {
        type: String, require: true
    },
    released: {
        type: String, require: true
    },
    background_image: {
        type: String, require: true
    },
    rating: {
        type: Number
    },
    ratings: [
        {
            id: Number,
            title: String,
            percent: Number,
        },
    ],
    ratings_count: {
        type: Number
    },
    reviews_text_count: {
        type: Number
    },
    metacritic: {
        type: Number
    },
    platforms: [
            {
            platform: {
                id: Number,
                name: String,
                slug: String,
                image_background: String
            },
        },
    ],
    genres: [
            {
            id: Number,
            name: String,
            slug: String,
        },
    ],
    tags: [
            {
            id: Number,
            name: String,
            slug: String,
        },
    ],
    esrb_rating: {
        id: Number,
        name: String,
        slug: String,
    },
    short_screenshots: [
        {
            id: Number,
            image: String,
        },
    ],
})

const Game = mongoose.model('Game', gameSchema)

module.exports = Game