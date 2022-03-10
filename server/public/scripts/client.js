$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit').on('click', handleSubmit)
}

function handleSubmit(){
  console.log( 'inside of submit' );

  let pZero = {
    playerNum: 0,
    guess: $('#playerZero').val()
  }
  let pOne = {
    playerNum: 1,
    guess: $('#playerOne').val()}

  let pTwo = {
    playerNum: 2,
    guess: $('#playerTwo').val()}

  let pThree = {
    playerNum: 3,
    guess:  $('#playerThree').val()}

    let playerArray = [pZero, pOne, pTwo, pThree];
    //LOOP THROUGH ARRAY OF OBJECT DATA FROM DOM
    //HAVE AJAX POST EACH INDIVIDUAL 
for (let guess of playerArray) {   
  // ajax post guesses
  $.ajax({
    url: '/input',
    method: 'POST',
    // data should ALWAYS be a object
    //this data turns in to the 'req.body' on the server side post
    data: { 
          playerNum: guess.playerNum,
          guess: guess.guess
          },
            // pZero
            // pOne,
            // pTwo,
            // pThree
          // { 
          //   playerNum: 1,
          //   guess: $('#playerOne').val()
          // },
          // { 
          //   playerNum: 2,
          //   guess: $('#playerTwo').val()
          // },
          // { 
          //   playerNum: 3,
          //   guess: $('#playerThree').val()
          // }

}).then(function(response) {
    console.log(response); 
    $('.input').val('');
})
}  // end for
}

function retrieveResults(){
  // ajax get results from random num comparison: 
  $.ajax({
    url: '/input',
    method: 'GET'
}).then(function(response) {
  //console.log the 'results' array sent from the app.get server side
    console.log(response);
    // render(response);
}).catch(function(error){
    console.log(error);
    alert('error in GET')
})
}


// function renderToDOM (results){
//   if (results.playerNum === 0){
//     $('#zeroGuess').append()
//   }
// }
