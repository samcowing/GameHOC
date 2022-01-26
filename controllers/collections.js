const { response } = require('express');
const express = require('express');
const { resolve } = require('path/posix');
const router = express.Router()
const Collection = require('../models/Collection');
const { db, collection } = require('../models/Game');
const Game = require('../models/Game');
const { route } = require('./games');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


function testUpdateAdd() {
    Collection.updateOne( {}, { $push: { games: "7"} }, (err, updated) => {
        if (err) return console.log(err)
        console.log(updated)
    })
}

//testUpdateAdd()

function getGames(gameIdString) {
    let query = "https://api.rawg.io/api/games/"
    let key = "?key=b37c07aab35b44058235af257c65be19"
    let arr = []
    return new Promise((resolve, reject) => {
        for (let i = 0; i < gameIdString.length; i++) {
            getGameData(query + gameIdString[i] + key).then((data) => {
                arr.push(data)
            }).then(() => {
                if (arr.length === gameIdString.length) {
                    console.log(arr)
                    resolve(arr)
                }
            })
        } 
    })
}

function getGameData(game) {
    return new Promise((resolve, reject) => {
        fetch(game).then((response) => {
            response.json().then((data) => {
                resolve(data)
            })
        }) 
    })
}

/***************************/
/*        New Route        */
/***************************/
router.get('/new', (req, res) => {
    res.render('collections/new.ejs')
})

/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    Collection.find({}, (err, allCollections) => {
        if (err) return res.send(err)
        res.render('collections/index.ejs', { collections: allCollections })
    })
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {

    Collection.findById(req.params.id, (err, foundCollection) => {
        if (err) return res.send(err)
        getGames(foundCollection.games).then((gamesArr) => {
            res.render('collections/show.ejs', { 
                collection: foundCollection,
                games: gamesArr 
            })
        })
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

router.get('/:id/edit2', (req, res) => {
    Collection.findById(req.params.id, (err, collectionToEdit) => {
        if (err) return res.send(err)
        res.render('collections/edit2.ejs', { collection: collectionToEdit })
    })
})

/******************************/
/*        Create Route        */
/******************************/
router.post('/', (req, res)=> {
    Collection.create(req.body, (err, newCollection) => {
        if (err) return res.send(err)
        res.redirect('collections')
    })
})
 
/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    Collection.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCollection) => {
        console.log(req.body)
        if (err) return res.send(err)
        res.redirect('/collections/' + req.params.id)
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

router.delete('/:id/:gameId', (req, res) => {
    return new Promise((resolve, reject) => {
        Collection.findOneAndUpdate( { _id: req.params.id }, { $pull: { games: req.params.gameId } }, { new: true}, (err, updated) => {
            if (err) return console.log(err)
            console.log(updated)  
            resolve()
        })
    }).then(() => {
        res.redirect('/collections/' + req.params.id)
    })  
})

module.exports = router

