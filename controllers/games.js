const express = require('express')
const router = express.Router()
const Game = require('../models/Game')
const mongoose = require('mongoose')

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


/***************************/
/*        Constants        */
/***************************/
const allGenres = {
                      '4': 'Action',
                      '51': 'Indie',
                      '3': 'Adventure',
                      '5': 'RPG',
                      '10': 'Strategy',
                      '2': 'Shooter',
                      '40': 'Casual',
                      '14': 'Simulation',
                      '7': 'Puzzle',
                      '11': 'Arcade',
                      '83': 'Platformer',
                      '1': 'Racing',
                      '59': 'Massively Multiplayer',
                      '15': 'Sports',
                      '6': 'Fighting',
                      '19': 'Family',
                      '28': 'Board Games',
                      '34': 'Educational',
                      '17': 'Card'
                  }


/***************************/
/*        Variables        */
/***************************/
apiQueryParams = {
    type: '',
    id: 0
}


/*****************************/
/*        API Request        */
/*****************************/
function categorySelect(type, id = '0') {
    let requestURL = ''
        console.log('type:',type)
    switch(type)
    {
        case('genres'):
            if (id === '0')
            {
                requestURL = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19"
            } else {
                requestURL = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19" + "&" + type + "=" + id 
            }
            break;
        case('id'):
            requestURL = "https://api.rawg.io/api/games/" + id + "?key=b37c07aab35b44058235af257c65be19"
            break;
    }
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
router.get('/genres/:id', (req, res) => {
    const query = categorySelect('genres', req.params.id)
    fetch(query).then((response) => {
        response.json().then((data) => {
            res.render('games/index.ejs', {
                games: data.results,
                genre: allGenres[req.params.id]
            })
        })
    })
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id', (req, res) => {
    const query = categorySelect('id', req.params.id)
    fetch(query).then((response) => {
        response.json().then((data) => {
            res.render('games/show.ejs', {
                game: data
            })
        })
    })
})

/*****************************/
/*        Create Route       */
/*****************************/

router.post('/:type/:id', (req, res) => {
    categorySelect(req.params.type, req.params.id)
    apiQueryParams.type = req.params.type
    apiQueryParams.id = req.params.id
    res.redirect('/games')
})


module.exports = router
