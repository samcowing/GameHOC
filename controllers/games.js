const express = require('express')
const router = express.Router()
const Game = require('../models/Game')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function categorySelect(type, categoryId) {
    const requestURL = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19" + "&" + type + "=" + categoryId
    console.log(requestURL)
    return requestURL
}

function clearDB() {
    return new Promise((resolve, reject) => {
        Game.deleteMany({}, (err, deleteCount) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Deleted return ${deleteCount}`)
                resolve()
            }
        })
    })
}

function queryAPI(requestURL) {
    return new Promise((resolve, reject) => {
        fetch(requestURL).then((response) => {
            response.json().then((data) => {
                Game.insertMany(data.results, (err, createdGames) => {
                    if (err) return console.log(err)
                    console.log('populating with ' + data.results.length + ' games')
                    resolve()
                })
            })
        })
    })
}



/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res) => {
    const query = categorySelect('genres', '51')
    clearDB().then(() => {
        queryAPI(query).then(() => {
            Game.find({}, (err, foundGames) => {
                if (err) return res.send(err)
                console.log(foundGames.length)
                res.render('games/index.ejs', {
                    game: foundGames
                })
            })
        })
    })
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id', (req, res) => {
    Game.findById(req.params.id, (err, foundGame) => {
        if (err) return res.send(err)
        res.render('games/show.ejs', { game: foundGame })
    })
})

/*****************************/
/*        Create Route       */
/*****************************/

router.post('/:type/:id', (req, res) => {
    categorySelect(req.params.type, req.params.id)
    res.redirect('/games');
})


module.exports = router
