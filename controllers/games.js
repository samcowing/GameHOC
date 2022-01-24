const express = require('express')
const router = express.Router()
const Game = require('../models/Game')


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req, res)=> {
    Game.find({}, (err, allGames) => {
        if (err) return res.send(err)
        res.render('games/index.ejs', { games: allGames })
    })
})

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=> {
    Game.findById(req.params.id, (err, foundGame) => {
        if (err) return res.send(err)
        res.render('games/show.ejs', { game: foundGame })
    })
})

/*****************************/
/*        Create Route       */
/*****************************/
router.post('/', (req, res)=> {
    Game.create(req.body, (err, newGame) => {
        if (err) return res.send(err)
        res.redirect('/games')
    })
})

module.exports = router
