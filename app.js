const express = require('express')
const res = require('express/lib/response')
const app = express()

const methodOverride = require('method-override')

const PORT = 8000

app.set('view engine', 'ejs')


app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))

app.get('/categories', (req,res)=>res.send('categories index'))

app.get('/categories/:id',(req,res)=>res.send("categories show:" + req.params.id))

app.post('/categories', (req,res)=>res.send('post request for categories'))

app.get('/', (req,res)=>{
    console.log('hitting home route')
    res.send('home route')
})


app.listen(PORT, ()=>console.log('Listening on port:', PORT))
