const express = require('express')
const app = express()
const router = express.Router()


/*****************************/
/*        Index Route        */
/*****************************/
router.get('/controllers', (req, res)=>res.send('controllers index'))

/***************************/
/*        New Route        */
/***************************/
router.get('/new', (req, res) => res.send('controllers new'));

/****************************/
/*        Show Route        */
/****************************/
router.get('/:id',(req, res)=>res.send('controllers show:' + req.params.id))

/******************************/
/*        Create Route        */
/******************************/
router.post('/', (req, res)=>res.send('controllers create'))

/******************************/
/*        Update Route        */
/******************************/
router.put('/:id', (req, res) => res.send('controllers update'))

/*******************************/
/*        Destroy Route        */
/*******************************/
router.delete('/:id', (req, res) => res.send('controllers delete'))

module.exports = router
