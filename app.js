const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')
const moment = require('moment');

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

const query = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19&ordering=-rating"
const query2 = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19&ordering=-released&dates=2021-01-27," + moment().format("YYYY-MM-DD")

app.get('/', (req, res)=>{
    console.log('hitting home route')
    console.log(query2)
    fetch(query).then((response) => {
        response.json().then((data) => {
            highestRated = data.results
        }).then(() => {
            fetch(query2).then((response2) => {
                response2.json().then((data2) => {
                    newReleases = data2.results
                    res.render('home.ejs', {
                        highestRated: highestRated,
                        newReleases: newReleases,
                    })
                })
            })
        })
    })
})


/****************************/
/*        Server Init       */
/****************************/
app.listen(PORT, ()=>console.log('Listening on port:', PORT))
