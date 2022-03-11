
$(document).ready(handleReady);

let roundCount = 0;

function handleReady() {
  console.log("jquery is loaded!");
  $('#submit').on('click', handleSubmit);
  $('#reset').on('click', handleReset);
}

function handleReset() {
  console.log('inside of reset');
  
  $.ajax({
    url: '/reset',
    method: 'POST',
    data: {
      reset: true
    }
  }).then(function(response) {
    console.log(response);

  })
}

function handleSubmit() {
  console.log('inside of submit');

  let pZero = {
    playerNum: 0,
    guess: $('#playerZero').val()
  }
  let pOne = {
    playerNum: 1,
    guess: $('#playerOne').val()
  }

  let pTwo = {
    playerNum: 2,
    guess: $('#playerTwo').val()
  }

  let pThree = {
    playerNum: 3,
    guess: $('#playerThree').val()
  }

  let playerArray = [pZero, pOne, pTwo, pThree];
  //loop through array and post with ajax each time
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

    }).then(function (response) {
      console.log(response);
      $('.input').val('');
    })
  } // end for
  retrieveResults();
}

function retrieveReset() {
  console.log('in retrieveReset');

  $.ajax({
    url: '/reset',
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    roundCount = 0;
    $('#tbodyToClear').empty();
  }).catch(function(error) {
    alert('ERROR IN GET')
  })
  
}

function retrieveResults() {
  // ajax get results from random num comparison: 
  $.ajax({
    url: '/input',
    method: 'GET'
  }).then(function (response) {
    //console.log the 'results' array sent from the app.get server side
    console.log(response);
    render(response);
  }).catch(function (error) {
    console.log(error);
    alert('error in GET');
  })
}

//SAMPLE OBJECT :
// {
//   playerNum: player.playerNum,
//   check: player.guess == number,
//   closeness: "YOU WIN"
//   }

function render(results) {

$('#tbodyToClear').empty();
roundCount++;


for (let i=0; i < results.length; i+=4) {
  $('tbody').append(
    `<tr>
      <td>${roundCount}</td>
      <td>${results[i].guess}</td>
      <td>${results[i].closeness}</td>
      <td>${results[i+1].guess}</td>
      <td>${results[i+1].closeness}</td>
      <td>${results[i+2].guess}</td>
      <td>${results[i+2].closeness}</td>
      <td>${results[i+3].guess}</td>
      <td>${results[i+3].closeness}</td>
    </tr>`
  )
}
}