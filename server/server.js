const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//server-side data: 
//module for random number generator: 
let rdmNum = require('./modules/random');
//array of objects consisting of playerNum and corresponding guess
let guesses = []; 
//array to hold results:
let results = [];

function compare(array, number) {
  // array.forEach(player => {
  //   // compares input guess with random number and pushes a boolean to result array
  //   results.push({
  //         playerNum: player.playerNum,
  //         check: player.guess === number
  //         });
  // })
      for (const player of array) {
        if (player.guess>rdmNum){
        results.push({
                  playerNum: player.playerNum,
                  check: player.guess == number,
                  closeness: "too high"
                  });
        } else if (player.guess<rdmNum){
          results.push({
            playerNum: player.playerNum,
            check: player.guess == number,
            closeness: "too low"
            }); 
        } else {
          results.push({
            playerNum: player.playerNum,
            check: player.guess == number,
            closeness: "YOU WIN"
            });
        }
}
return results;
}

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here

// receives input guesses from client and adds them to guesses array
app.post('/input', (req, res) => {
  console.log('POST input', guesses.push(req.body));

  res.sendStatus(201); // 201 -> Created
});

//get results route
app.get('/input', function(req, res){
//get results from comparison between user guesses POST and random number: 
  console.log('getting /inputs');
  res.send(compare(guesses, 12));
});


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})


