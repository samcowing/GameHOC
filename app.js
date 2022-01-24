const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')

const PORT = 8000

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

mongoose.connect('mongodb://127.0.0.1/games')

/************************/
/*        Config        */
/************************/
app.set('view engine', 'ejs')


/****************************/
/*        Middleware        */
/****************************/
app.use(express.static('public'));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))


/*****************************/
/*        Controllers        */
/*****************************/
app.use('/games', gamesController)
app.use('/collections', collectionsController)


/****************************/
/*        Home Route        */
/****************************/
app.get('/', (req, res)=>{
    console.log('hitting home route')
    res.render('home.ejs')
})


/****************************/
/*        Server Init       */
/****************************/
app.listen(PORT, ()=>console.log('Listening on port:', PORT))
