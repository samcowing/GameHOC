const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')
const usersController = require('./controllers/users')

require('dotenv').config()

const PORT = process.env.PORT

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*********************************/
/*        Mongoose Config        */
/*********************************/
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODBURI
//const mongoURI = 'mongodb://127.0.0.1:27017/games'

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
app.use(cookieParser())
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUnitinitialized: false
    })
)


/*****************************/
/*        Controllers        */
/*****************************/
app.use('/games', gamesController)
app.use('/collections', collectionsController)
app.use('/auth', usersController)


/****************************/
/*        Home Route        */
/****************************/
app.get('/', (req, res)=>{
    res.render('login.ejs')
})


/****************************/
/*        Server Init       */
/****************************/
app.listen(PORT, ()=>console.log('Listening on port:', PORT))
