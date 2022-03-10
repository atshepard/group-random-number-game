$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit').on('click', handleSubmit)
}

function handleSubmit(){
  console.log( 'inside of submit' );
  // ajax post guesses
  $.ajax({
    url: '/input',
    method: 'POST',
    // data should ALWAYS be a object
    //this data turns in to the 'req.body' on the server side post
    data: { 
        playerNum: playerNum,
        guess: guess
    }
}).then(function(response) {
    console.log(response); 
    $('.input').val('');
})
}

function retrieveResults(){
  // ajax get results from random num comparison: 
  $.ajax({
    url: '/input',
    method: 'GET'
}).then(function(response) {
  //console.log the 'results' array sent from the app.get server side
    console.log(response);
}).catch(function(error){
    console.log(error);
    alert('error in GET')
})
}


