const express = require('express')
const app = express()
const router = express.Router()


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/', (req,res)=>res.send('games index'))

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req,res)=>res.send("games show:" + req.params.id))

/*****************************/
/*        Create Route        */
/*****************************/
router.post('/', (req,res)=>res.send('games create'))

module.exports = router
