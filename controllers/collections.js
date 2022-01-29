const { response } = require('express');
const express = require('express');
const { resolve } = require('path/posix');
const router = express.Router()
const Collection = require('../models/Collection');
const { db, collection } = require('../models/Game');
const Game = require('../models/Game');
const { route } = require('./games');
const moment = require('moment');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

////****** This gets the game data for a specific show page ******//////
function getGames(gameIdString) {
    let query = "https://api.rawg.io/api/games/"
    let key = "?key=b37c07aab35b44058235af257c65be19"
    let arr = []
    return new Promise((resolve, reject) => {
        for (let i = 0; i < gameIdString.length; i++) {
            getGameData(query + gameIdString[i].id + key).then((data) => {
                arr.push(data)
            }).then(() => {
                if (arr.length === gameIdString.length) {
                    resolve(arr)
                }
            })
        } 
    })
} 
/// Note this is for show page only, index was too slow and difficult, so the games real name and image are saved to the collection. Can add more things if needed

////****** This grabs the specified game's object for the above function ******//////
function getGameData(game) {
    return new Promise((resolve, reject) => {
        fetch(game).then((response) => {
            response.json().then((data) => {
                resolve(data)
            })
        }) 
    })
}

////****** This adds games real name & image when new game is added to collection ******//////
function queryAPI(gameId) {
    return new Promise((resolve, reject) => {
        let requestURL = "https://api.rawg.io/api/games/" + gameId + "?key=b37c07aab35b44058235af257c65be19"
        fetch(requestURL).then((response) => {
            response.json().then((data) => {
                let dataArr = [data.name, data.background_image]
                if (dataArr.length === 2) {
                    resolve(dataArr)
                }
            })
        })
    })
}

/***************************/
/*        New Route        */
/***************************/
router.get('/new', (req, res) => {
    if (req.session.currentUser)
    {
        res.render('collections/new.ejs', {
            user: req.session.currentUser
        })
    } else {
        res.redirect('/prompt')
    }
})

/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    if (req.session.currentUser)
    {
        Collection.find({ owner: req.session.currentUser.username }, (err, allCollections) => {
            if (err) return res.send(err)
            res.render('collections/index.ejs', {
                collections: allCollections,
                user: req.session.currentUser
            })
        })
    } else {
        res.redirect('/prompt')
    }
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {
    Collection.findById(req.params.id, (err, foundCollection) => {
        if (err) return res.send(err)
        if (foundCollection.games.length > 0) {
            getGames(foundCollection.games).then((gamesArr) => {
                res.render('collections/show.ejs', { 
                    collection: foundCollection,
                    games: gamesArr 
                })
            })
        } else {
            res.render('collections/show.ejs', { 
                collection: foundCollection,
            })
        }
    })
})


/****************************/
/*        Edit Route        */
/****************************/
router.get('/:id/edit', (req, res) => {
    Collection.findById(req.params.id, (err, collectionToEdit) => {
        if (err) return res.send(err)
        res.render('collections/edit.ejs', { collection: collectionToEdit })
    })
})

/****************************/
/*        AddGames Route        */
/****************************/
router.get('/:id/addgames', (req, res) => {
    Collection.findById(req.params.id, (err, collectionToEdit) => {
        if (err) return res.send(err)
        res.render('collections/addGames.ejs', { collection: collectionToEdit })
    })
})

/******************************/
/*        Create Route        */
/******************************/
router.post('/', (req, res)=> {
    if (req.session.currentUser)
    {
        const collectionDbEntry = {
            title: req.body.title,
            description: req.body.description,
            owner: req.session.currentUser.username
        }
        Collection.create(collectionDbEntry, (err, newCollection) => {
            if (err) return res.send(err)
            res.redirect('collections')
        })
    } else {
        res.send('Error: Not logged in')
    }
})
 
/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    Collection.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCollection) => {
        //console.log(req.body)
        if (err) return res.send(err)
        res.redirect('/collections/' + req.params.id)
    })
})

//// Add Games PUT route
router.put('/:id/add', (req, res) => {
    queryAPI(req.body.id).then((dataArr) => {
        let newGame = { $push: { games: { id: req.body.id, name: dataArr[0], image: dataArr[1], } } }
        Collection.findByIdAndUpdate(req.params.id, newGame, { new: true }, (err, updatedCollection) => {
            if (err) return res.send(err)
            console.log(updatedCollection)
            res.redirect('/collections/' + req.params.id)
        })
    })
})

/*******************************/
/*        Destroy Route        */
/*******************************/

router.delete('/:id', (req, res) => {
    Collection.findByIdAndDelete(req.params.id, (err, response) => {
        if (err) return res.send(err)
        res.redirect('/collections')
    })
})

//// Delete game from collection
router.delete('/:id/:gameId', (req, res) => {
    return new Promise((resolve, reject) => {
        let removeGame = { $pull: { games: { id: req.params.gameId } } }
        Collection.findByIdAndUpdate({_id: req.params.id}, removeGame, { new: true }, (err, updated) => {
            if (err) return console.log(err) 
            resolve()
        })
    }).then(() => {
        res.redirect('/collections/' + req.params.id)
    })  
})

module.exports = router
