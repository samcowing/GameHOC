const express = require('express')
const router = express.Router()


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    res.render('games/index.ejs')
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {
    res.render('games/show.ejs')
})

/*****************************/
/*        Create Route       */
/*****************************/
router.post('/', (req, res)=> {
    res.redirect('/games')
})

module.exports = router
