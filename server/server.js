const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

//server-side data: 
//module for random number generator: 
let rdmNum = require('./modules/random')
let newRN = rdmNum.randomNumber(1, 25);
//array of objects consisting of playerNum and corresponding guess
let guesses = []; 
//array to hold results:
let results = [];
// rdmNum.randomNumber(1, 25);

//compares each item in a given array to a given number:
function compare(array, number) {
  //loops through the given array
      for (const player of array) {
        //if the guess is greater than the random number
        if (player.guess>newRN){
          //push an object with player number, player's result, and closeness to given number
            results.push({
              playerNum: player.playerNum,
              guess: player.guess,
              check: player.guess == number,
              closeness: "too high"
              });
          //if the guess is less than the random number            
        } else if (player.guess<newRN){
          //push an object with player number, player result and closeness
            results.push({
              playerNum: player.playerNum,
              guess: player.guess,
              check: player.guess == number,
              closeness: "too low"
              }); 
          //if the player guess is neither higher nor lower  
        } else {
          //this player wins!
            results.push({
              playerNum: player.playerNum,
              guess: player.guess,
              check: player.guess == number,
              closeness: "YOU WIN"
              });
        }
      }
guesses = [];
//returns the results array
return results;
}

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// GET & POST Routes go here:
// receives input guesses from client and adds them to guesses array
app.post('/input', (req, res) => {
  console.log('POST input', guesses.push(req.body));

  res.sendStatus(201); // 201 -> Created
});
//get results from comparison between user guesses POST and random number: 
app.get('/input', function(req, res){
  console.log('getting /inputs');
  res.send(compare(guesses, newRN));
});

//run post after reset button click
app.post('/reset', (req,res) => {
  console.log( 'reset triggered');
  guesses = [];
  results = [];
  newRN = rdmNum.randomNumber(1, 25);
  res.sendStatus(200);
})

app.get('/reset', function(req, res){
  console.log('getting reset');
  res.send('reset complete:', true);
});


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
});


