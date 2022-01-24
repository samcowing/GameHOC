const express = require('express')
const res = require('express/lib/response')
const methodOverride = require('method-override')
const app = express()
const gamesController = require('./controllers/games')
const collectionsController = require('./controllers/collections')

const PORT = 8000


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


/****************************/
/*        Home Route        */
/****************************/
app.get('/', (req, res)=>{
    console.log('hitting home route')
    res.send('home route')
})


/****************************/
/*        Server Init       */
/****************************/
app.listen(PORT, ()=>console.log('Listening on port:', PORT))
