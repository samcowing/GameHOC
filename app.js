const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')

const PORT = 8000

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*********************************/
/*        Mongoose Config        */
/*********************************/
const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/games'

mongoose.connect(mongoURI)
mongoose.connection.on('connected', () => {
    console.log('connected to mongoDB')
})


/************************/
/*        Config        */
/************************/
app.set('view engine', 'ejs')
app.locals.moment = require('moment');

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
