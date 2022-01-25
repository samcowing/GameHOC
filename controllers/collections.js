const express = require('express')
const router = express.Router()
const Collection = require('../models/Collection')
const Game = require('../models/Game')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*
function testUpdate () {
    Collection.updateMany( {}, { $push: { games: {"id" : "7"}, } }, {new: true}, (err, updated) => {
        if (err) return console.log(err)
        console.log(updated)
    })
}

testUpdate()
*/

/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    Collection.find({}, (err, allCollections) => {
        if (err) return res.send(err)
        res.render('collections/index.ejs', { collections: allCollections })
    })
})

/***************************/
/*        New Route        */
/***************************/
router.get('/new', (req, res) => {
    res.render('collections/new.ejs')
})

router.get('/addGame/:id/:name', (req, res) => {
    let gameId = req.params.id
    let gameName = req.params.name
    Collection.find({}, (err, allCollections) => {
        if (err) return res.send(err)
        res.render('collections/index.ejs', { 
            collections: allCollections, gameId, gameName
        })

        console.log(gameName)
    })
})


/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {
    Collection.findById(req.params.id, (err, foundCollection) => {
        if (err) return res.send(err)
        res.render('collections/show.ejs', { collection: foundCollection })
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
    //req.body.gameId = req.body.games.id
    //req.body.gameName = req.body.games.name
    //console.log(req.body.games.id)
    //console.log(req.body.games.name)
    Collection.create(req.body, (err, newCollection) => {
        console.log(newCollection)
        //let obj = {}
        //req.body.games.push(obj[200])
        if (err) return res.send(err)
        res.redirect('/collections')
    })
})

router.post(':id/:game', (req, res) => {
    let gameId = { $pull: { games: { id: req.params.game} }}
        Collection.findByIdAndUpdate(req.params.id, gameId, { new: true }, (err, updatedCollection) => {
            if (err) return res.send(err)
            res.redirect('/collections/' + req.params.id)
        })

})  //This doesn't work


/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    /*if ( req.params.action === "add" ) {
        let gameId = { $push: { games: { "id": req.params.gameId} }}
        Collection.findByIdAndUpdate(req.params.colId, gameId, { new: true }, (err, updatedCollection) => {
        if (err) return res.send(err)
        res.redirect('/collections/' + req.params.id)
        })
    } 
    else if ( req.params.action === "remove" ){ 
        let gameId = { $pull: { games: { id: req.params.gameId} }}
        Collection.findByIdAndUpdate(req.params.id, gameId, { new: true }, (err, updatedCollection) => {
            if (err) return res.send(err)
            res.redirect('/collections/' + req.params.id)
        })
    } else {*/
        Collection.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedCollection) => {
            console.log(req.body)
            if (err) return res.send(err)
            res.redirect('/collections/' + req.params.id)
        })
    //}
})

router.put('cg/:id/:game', (req, res) => {
 
    Collection.findByIdAndUpdate(req.params.id, { $pull: { games: {id : req.params.game}, } }, (err, updated) => {
        if (err) return console.log(err)
        console.log(updated)
        res.redirect('/collections/' + req.params.id)
    })

}) //This doesn't work


/*******************************/
/*        Destroy Route        */
/*******************************/
router.delete('/:id', (req, res) => {
    Collection.findByIdAndDelete(req.params.id, (err, response) => {
        if (err) return res.send(err)
        res.redirect('/collections')
    })
})



module.exports = router
