const express = require('express')
const router = express.Router()
const Collection = require('../models/Collection')


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
        res.render('collections/show.ejs', { collection: foundCollection })
    })
})

/****************************/
/*        Edit Route        */
/****************************/
router.get('/:id/edit', (req, res) => {
    Collection.findById(req.params.id, (err, collectionToEdit) => {
        if (err) return req.send(err)
        res.render('collection/edit.ejs', { collection: collectionToEdit })
    })
})

/******************************/
/*        Create Route        */
/******************************/
router.post('/', (req, res)=> {
    Collection.create(req.body, (err, newCollection) => {
        if (err) return res.send(err)
        res.redirect('/collections')
    })
})

/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    Collection.findByIdAndUpdate(req.params.id, { new: true }, (err, updatedCollection) => {
        if (err) return res.send(err)
        res.redirect('/games/' + req.params.id)
    })
})

/*******************************/
/*        Destroy Route        */
/*******************************/
router.delete('/:id', (req, res) => {
    Collection.findByIdAndDelete(req.params.id, (err, response) => {
        if (err) return res.send(err)
        res.redirect('/games')
    })
})

module.exports = router
