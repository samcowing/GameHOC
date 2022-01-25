const express = require('express');
const { resolve } = require('path/posix');
const router = express.Router()
const Collection = require('../models/Collection');
const { db } = require('../models/Game');
const Game = require('../models/Game')

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


function testUpdateAdd() {
    Collection.updateOne( {}, { $push: { games: "7"} }, (err, updated) => {
        if (err) return console.log(err)
        console.log(updated)
    })
}

//testUpdateAdd()


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

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {
    Collection.findById(req.params.id, (err, foundCollection) => {
        if (err) return res.send(err)
        console.log(foundCollection)
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
    Collection.findOneAndUpdate( { _id: req.params.id }, { $pull: { games: req.params.gameId } }, { new: true}, (err, updated) => {
        if (err) return console.log(err)
        console.log(updated)
        res.redirect('/collections/' + req.params.id)
        
    })
})  

module.exports = router

