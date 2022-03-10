$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!")
  $('#submit').on('click', handleSubmit)
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

    }).then(function (response) {
      console.log(response);
      $('.input').val('');
    })
  } // end for
  retrieveResults();
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

$('tbody').empty();

$('tbody').append(
          `<tr>
            <td>${round}</td>
            <td>${results[0].guess}</td>
            <td>${results[0].closeness}</td>
            <td>${results[1].guess}</td>
            <td>${results[1].closeness}</td>
            <td>${results[2].guess}</td>
            <td>${results[2].closeness}</td>
            <td>${results[3].guess}</td>
            <td>${results[3].closeness}</td>
          </tr>`
        )

}