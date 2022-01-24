const express = require('express');
const mongoose = require('mongoose');
const Game = require('./models/Game.js')
const app = express()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

mongoose.connect('mongodb://127.0.0.1/testGames')


app.set('view engine', 'ejs');

let requestUrl = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19";
const options = {
    method: 'GET'
};


function categorySelect () {
    let type = "genre"
    let categoryId = "3"
    requestUrl = "https://api.rawg.io/api/games?key=b37c07aab35b44058235af257c65be19" + "&" + type + "=" + categoryId
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
//categorySelect()

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

app.listen(3000, function(){
  console.log('Listening on port 3000')
});