const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const session = require('express-session')
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')
const usersController = require('./controllers/users')
const User = require('./models/User')
const moment = require('moment');

require('dotenv').config()

const PORT = process.env.PORT

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

/*********************************/
/*        Mongoose Config        */
/*********************************/
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODBURI || 'mongodb://127.0.0.1:27017/gamehoc'

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
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
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

const query = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19&ordering=-rating&metacritic=50,100"
const query2 = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19&ordering=-released&dates=2021-01-27," + moment().format("YYYY-MM-DD") + "&metacritic=50,100"

app.get('/', (req, res)=>{
    fetch(query).then((response) => {
        response.json().then((data) => {
            topRated = data.results
        }).then(() => {
            fetch(query2).then((response2) => {
                response2.json().then((data2) => {
                    newReleases = data2.results
                    res.render('home.ejs', {
                        topRated: topRated,
                        newReleases: newReleases,
                        user: req.session.currentUser
                    })
                })
            })
        })
    })
})


/*****************************/
/*        Login Route        */
/*****************************/
app.get('/login', (req, res) => {
    res.render('login.ejs', {
        user: req.session.currentUser
    })
})


/******************************/
/*        Signup Route        */
/******************************/
app.get('/signup', (req, res) => {
    res.render('signup.ejs', {
        user: req.session.currentUser
    })
})


/*******************************************/
/*        Login/Signup Prompt Route        */
/*******************************************/
app.get('/prompt', (req, res) => {
    res.render('prompt.ejs', {
        user: req.session.currentUser
    })
})


/****************************/
/*        Server Init       */
/****************************/
app.listen(PORT, ()=>console.log('Listening on port:', PORT))
