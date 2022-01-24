const express = require('express')
const router = express.Router()
const Game = require('../models/Game')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function categorySelect(type, categoryId) {
    requestUrl = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19" + "&" + type + "=" + categoryId
    console.log(requestUrl)
    main()
}

categorySelect("null", "3")

function main() {
    Game.deleteMany({}, (err, deleteCount) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Deleted return ${deleteCount}`)
        }
        fetch(requestUrl).then((response) => {
            response.json().then((data) => {
                for (let i = 0; i < data.results.length; i++) {
                    Game.create(data.results[i], (err, createdGame) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        })
    })

}

/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res) => {
    Game.find({}, function (err, foundGame) {
        if (err)
            console.log('Database  error!');
        else {
            res.render('games/index', {
                game: foundGame
            });
        }
    });
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
