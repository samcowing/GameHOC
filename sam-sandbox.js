const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const Game = require('./models/Game.js')
const app = express()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

mongoose.connect('mongodb://127.0.0.1/games')


app.set('view engine', 'ejs');

/*
let requestUrl = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19";
const options = {
    method: 'GET'
};g
*/



function categorySelect () {
    let type = "genres"
    let categoryId = "15"
    requestUrl = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19&" + type + "=" + categoryId
    console.log(requestUrl)
    main()
}

function main() {
    Game.deleteMany({}, (err, deleteCount) => {
        if (err) {
            console.log(err)
        } else {
            console.log(`Deleted return ${deleteCount}`)
        }
        console.log(requestUrl)
        fetch(requestUrl).then((response) => {
            response.json().then((data) => {
                for (let i = 0; i < data.results.length; i++) {
                    Game.create(data.results[i], (err, createdGame) => {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            })
        })
    })   
       
}

//main()
categorySelect()



app.get('/games', function (req, res){

  Game.find({}, function (err, foundGame){
    if (err)
      console.log('Database  error!');
    else{
      res.render('games/index', {
          game: foundGame
      });
    }
  });
});

app.get('/', function (req, res){

    Game.find({}, function (err, foundGame){
      if (err)
        console.log('Database  error!');
      else{
        res.render('home', {
            game: foundGame
        });
      }
    });
});

app.post('/categories/:type/:id', (req, res) => {
    categorySelect(req.params.type,req.params.id)
    //pokemon.push(req.body)
    res.redirect('/categories');
})

app.listen(3000, function(){
  console.log('Listening on port 3000')
});