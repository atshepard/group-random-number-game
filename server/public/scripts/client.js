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
    data: { 
        // // ?????????? 
    }
}).then(function(response) {
    console.log(response); 
    $('.input').val('');
})
}

function retrieveRandomNumber(){
  // ajax get Random number
  
}


