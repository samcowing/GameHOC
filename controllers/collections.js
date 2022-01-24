const express = require('express')
const router = express.Router()


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    res.render('collections/index.ejs')
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
    res.render('collections/show.ejs')
})

/******************************/
/*        Create Route        */
/******************************/
router.post('/', (req, res)=> {
    res.redirect('/collections')
})

/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => {
    res.redirect('/games/' + req.params.id)
})

/*******************************/
/*        Destroy Route        */
/*******************************/
router.delete('/:id', (req, res) => {
    res.redirect('/games')
})

module.exports = router
